using Amazon.S3;
using Amazon.S3.Model;
using BackEnd.Data;
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
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = string.IsNullOrEmpty(prefix) ? feedDto.file.FileName : $"{prefix?.TrimEnd('/')}/{feedDto.file.FileName}",
                InputStream = feedDto.file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", feedDto.file.ContentType);
            await _s3Client.PutObjectAsync(request);
            return Ok($"File {prefix}/{feedDto.file.FileName} uploaded to S3 successfully!");
        }
    }
}
