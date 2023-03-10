using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace BackEnd.Services
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Guid senderId, Guid receiverId, string message)
        {
            // Save message to database

            await Clients.All.SendAsync("ReceiveMessage", senderId, receiverId, message);
        }
    }
}