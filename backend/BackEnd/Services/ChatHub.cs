using BackEnd.Data;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class ChatHub : Hub
    {
        private readonly DataContext _context;

        public ChatHub(DataContext context)
        {
            _context = context;
        }

        public async Task SendMessage(Guid senderId, Guid receiverId, string message)
        {
            // Check if chat hub already exists
            // Find existing chat hub or create a new one
            var rec = _context.Users.Find(receiverId).Username;
            var sen = _context.Users.Find(senderId).Username;
            
            var chatHubId = $"{sen}_{rec}";
            if (senderId.CompareTo(receiverId) > 0)
            {
                chatHubId = $"{rec}_{sen}";
            }

            var chatHub = Clients.Group(chatHubId);

            if (chatHub == null)
            {
                await Groups.AddToGroupAsync(senderId.ToString(), chatHubId);
                await Groups.AddToGroupAsync(receiverId.ToString(), chatHubId);
            }

            await Clients.Group(chatHubId).SendAsync("ReceiveMessage", senderId, receiverId, message);

        }


    }
}