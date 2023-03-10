using System.Net;
using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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


            // Check if chat hub already exists
            // Find existing chat hub or create a new one
            var chatHubId = $"{senderId}_{receiverId}";
            if (senderId.CompareTo(receiverId) > 0)
            {
                chatHubId = $"{receiverId}_{senderId}";
            }

            var chatHub = hubContext.Clients.Group(chatHubId);

            if (chatHub == null)
            {
                await hubContext.Groups.AddToGroupAsync(senderId.ToString(), chatHubId);
                await hubContext.Groups.AddToGroupAsync(receiverId.ToString(), chatHubId);
            }
            
            // Send message to chat participants
            await chatHub.SendAsync("ReceiveMessage", senderId, receiverId, message);


            var chatMessage = new ChatMessage
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Message = message,
                DateTimeSent = DateTime.UtcNow,
            };

            _context.Messages.Add(chatMessage);
            await _context.SaveChangesAsync();

            // Broadcast message to chat group
            await hubContext.Clients.Group(chatHubId).SendAsync("ReceiveMessage", senderId, receiverId, message);

            return Ok(chatMessage);
        }



    }
}
