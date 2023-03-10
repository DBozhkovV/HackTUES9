using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("friendship")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserService _userService;

        public FriendshipController(DataContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> SendFriendRequest(SendFriendRequest sendFriendRequest)
        {
            if (HttpContext.Session.GetString("userId") == null) 
            {
                return Unauthorized();
            }

            Guid requesterId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var requesterUser = _context.Users.FirstOrDefault(x => x.Id == requesterId);

            if (requesterUser == null)
            {
                return BadRequest("There's no such a user.");
            }

            var receiverUser = _context.Users.FirstOrDefault(x => x.Username == sendFriendRequest.Username);
            if (receiverUser == null)
            {
                return BadRequest("Invalid request.");
            }

            var newFriendRequest = new Friendship()
            {
                RequesterId = requesterId,
                ReceiverId = receiverUser.Id
            };

            await _context.Friendships.AddAsync(newFriendRequest);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("accept/{requestId}")]
        public async Task<IActionResult> AcceptRequest([FromRoute] Guid requestId)
        {
            if (HttpContext.Session.GetString("userId") == null)
            {
                return Unauthorized();
            }

            Guid accepterId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var accepter = _context.Users.FirstOrDefault(x => x.Id == accepterId);

            if (accepter == null)
            {
                return BadRequest("There's no such a user.");
            }

            var request = await _context.Friendships.FindAsync(requestId);
            if (request is null) 
            {
                return BadRequest("There is no such request.");
            }

            if (request.ReceiverId != accepterId) 
            {
                return BadRequest("Invalid request.");
            }

            request.status = RequestStatus.Accepted;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("reject/{requestId}")]
        public async Task<IActionResult> RejectRequest([FromRoute] Guid requestId)
        {
            if (HttpContext.Session.GetString("userId") == null)
            {
                return Unauthorized();
            }

            Guid accepterId = Guid.Parse(HttpContext.Session.GetString("userId"));
            var accepter = _context.Users.FirstOrDefault(x => x.Id == accepterId);

            if (accepter == null)
            {
                return BadRequest("There's no such a user.");
            }

            var request = await _context.Friendships.FindAsync(requestId);
            if (request is null)
            {
                return BadRequest("There is no such request.");
            }

            if (request.ReceiverId != accepterId)
            {
                return BadRequest("Invalid request.");
            }

            request.status = RequestStatus.Rejected;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("friendRequests")]
        public IActionResult GetFriendRequests() 
        {
            if (HttpContext.Session.GetString("userId") == null)
            {
                return Unauthorized();
            }
        
            Guid userId = Guid.Parse(HttpContext.Session.GetString("userId"));
            
            try
            {
                List<FriendRequest> friendRequests = _userService.GetFriendRequests(userId);
                if (!friendRequests.Any())
                {
                    return BadRequest("There are no friend requests.");
                }
                return Ok(friendRequests);
            } catch (Exception exception) 
            {
                return BadRequest(exception.Message);
            }    
        }
        
    }
}
