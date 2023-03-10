using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Guid senderId, Guid receiverId, string message)
        {
            // Check if chat hub already exists
            // Find existing chat hub or create a new one
            var chatHubId = $"{senderId}_{receiverId}";
            if (senderId.CompareTo(receiverId) > 0)
            {
                chatHubId = $"{receiverId}_{senderId}";
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