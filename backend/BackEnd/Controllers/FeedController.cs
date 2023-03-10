using Amazon.S3;
using Amazon.S3.Model;
using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private DataContext _context;
        private string bucketName = "2loops";
        private string prefix = null;
        
        public FeedController(DataContext dataContext, IAmazonS3 s3Client) {
            _context = dataContext;
            _s3Client = s3Client;
        }
        
        [HttpPost("/AddPost")]
        public async Task<IActionResult> AddPost([FromForm]FeedDto feedDto) {
            if (HttpContext.Session.GetString("userId") == null) 
            { 
                return BadRequest("You have to be loged In");
            }
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);

            if (!bucketExists) 
            { 
                return NotFound($"Bucket {bucketName} does not exist.");
            }
            
            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = string.IsNullOrEmpty(prefix) ? feedDto.file.FileName : $"{prefix?.TrimEnd('/')}/{feedDto.file.FileName}",
                InputStream = feedDto.file.OpenReadStream()
            };
            
            var Feed = new Feed() {
                Key = request.Key,
                Description = feedDto.Description,
                UserId = personId,
            };
            
            _context.Feed.Add(Feed);
            await _context.SaveChangesAsync();
            request.Metadata.Add("Content-Type", feedDto.file.ContentType);
            await _s3Client.PutObjectAsync(request);
            return Ok($"File {prefix}/{feedDto.file.FileName} uploaded to S3 successfully!");
        }
        
        [HttpPost("/Like")]
        public async Task<IActionResult> LikePost(Like likeDto) {
            
            if (HttpContext.Session.GetString("userId") == null) 
            { 
                return BadRequest("You have to be loged In");
            }
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var likeExists = _context.Likes
                .Where(x => x.UserId.Equals(personId) && x.FeedId.Equals(likeDto.PostId))
                .FirstOrDefault();
            
            if (likeExists != null) 
            {
                return Ok("You awrady liked the photo");
            }
            
            var like = new Likes() {
                FeedId= likeDto.PostId,
                UserId = personId,
            };
            _context.Likes.Add(like);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("/comment")]
        public async Task<IActionResult> Coment(ComentDto comentDto)
        {
            if (HttpContext.Session.GetString("userId") == null) 
            { 
                return BadRequest("You have to be loged In");
            }
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            
            var Coment = new Coments()
            {
                FeedId = comentDto.PostId,
                UserId = personId,

                Coment = comentDto.Coment,
            };
            
            _context.Coments.Add(Coment);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("/EditUsername")]
        public async Task<IActionResult> EditUserName(string userName)
        {
            if (HttpContext.Session.GetString("userId") == null)
            {
                return BadRequest("You have to be loged In");
            }
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var person = _context.Users.Find(personId);
            _context.Users.Update(person);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("/GetPosts")]
        public async Task<IActionResult> GetPosts()
        {
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var friends = _context.Friendships
                .Where(x => (x.RequesterId.Equals(personId) || x.ReceiverId.Equals(personId)) && (x.status == RequestStatus.Accepted))
                .ToList();
            List<Feed> YourFeed = new List<Feed>();
            for (int i = 0; i < friends.Count; i++)
            {
                var posts = _context.Feed
                    .Where(x => x.UserId.Equals(friends[i].RequesterId) || x.UserId.Equals(friends[i].ReceiverId))
                    .ToList();
                for (int j = 0; j < posts.Count; j++)
                {
                    YourFeed.Add(posts[j]);
                }
            }
            return Ok(YourFeed);
        }
        [HttpGet("/UserFeed")]
        public async Task<IActionResult> GetUsersPosts() {
            var personId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var posts = _context.Feed.Where(x => x.UserId.Equals(personId)).ToList();
            return Ok(posts);
        }
        
        [HttpGet("/GetLikes")]
        public async Task<IActionResult> GetLikes(Guid feedId)
        {
            var likes = _context.Likes
                .Where(x => x.FeedId.Equals(feedId))
                .ToList();
            return Ok(likes);
        }
        
        [HttpGet("/GetComments")]
        public async Task<IActionResult> GetComments(Guid feedId)
        {
            var comments = _context.Coments
                .Where(x => x.FeedId.Equals(feedId))
                .ToList();
            return Ok(comments);
        }
    }
}
