using System.Net;
using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace BackEnd.Controllers
{
    [Route("chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ChatHub _chatHub;
        public ChatController(DataContext context, ChatHub chatHub)
        {
            _context = context;
            _chatHub = chatHub;
        }

        [HttpPost]
        [Route("sendMessage/{receiverId}")]
        public async Task<IActionResult> SendMessageAsync([FromRoute] Guid receiverId, [FromBody] string message)
        {
            var senderId = Guid.Parse(HttpContext.Session.GetString("userId"));

            var areFriends = _context.Friendships.Where(x =>
                (x.ReceiverId == senderId || x.RequesterId == senderId) &&
                (x.ReceiverId == receiverId || x.RequesterId == receiverId) && x.status == RequestStatus.Accepted);
            if (!areFriends.Any())
            {
                return BadRequest("You are not friend with this user.");
            }
            var hubContext = this.HttpContext.RequestServices.GetRequiredService<IHubContext<ChatHub>>();

            var chatMessage = new ChatMessage
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Message = message,
                DateTimeSent = DateTime.UtcNow,
            };

            _context.Messages.Add(chatMessage);
            await _context.SaveChangesAsync();


            return Ok(chatMessage);
        }

        [HttpGet]
        [Route("getMessages/{receiverId}")]
        public async Task<IActionResult> GetMessagesAsync([FromRoute] Guid receiverId)
        {
            var senderId = Guid.Parse(HttpContext.Session.GetString("userId"));

            // Retrieve messages between the sender and receiver
            var messages = await _context.Messages
                .Where(m =>
                    (m.SenderId == senderId && m.ReceiverId == receiverId) ||
                    (m.SenderId == receiverId && m.ReceiverId == senderId))
                .OrderBy(m => m.DateTimeSent)
                .ToListAsync();

            return Ok(messages);
        }




    }
}
