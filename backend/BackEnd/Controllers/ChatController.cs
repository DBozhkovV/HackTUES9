using System.Net;
using BackEnd.Data;
using BackEnd.Data.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly DataContext _context;

        public ChatController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("sendMessage/{receiverId}")]
        public async Task<IActionResult> SendMessageAsync([FromRoute]Guid receiverId,[FromBody] string message)
        {
            var senderId = Guid.Parse(HttpContext.Session.GetString("userId"));

            var areFriends = _context.Friendships.Where(x =>
                (x.ReceiverId == senderId || x.RequesterId == senderId) &&
                (x.ReceiverId == receiverId || x.RequesterId == receiverId) && x.status == RequestStatus.Accepted);
            if (!areFriends.Any())
            {
                return BadRequest("You are not friend with this user.");
            }
            var chatMessage = new ChatMessage
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Message = message,
                DateTimeSent = DateTime.UtcNow
            };

            _context.Messages.Add(chatMessage);
            await _context.SaveChangesAsync();
            return Ok(chatMessage);
        }



    }
}
