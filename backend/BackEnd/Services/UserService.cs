using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;

namespace BackEnd.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public List<FriendRequest> GetFriendRequests(Guid userId)
        {
            List<FriendRequest> friendRequests = new List<FriendRequest>();
            _context.Friendships.ToList().ForEach(friendRequest => {
                if (friendRequest.ReceiverId == userId)
                {
                    if (friendRequest.status == RequestStatus.Pending)
                    {
                        FriendRequest request = new FriendRequest()
                        {
                            FriendshipId = friendRequest.Id,
                            Username = GetUsernameById(friendRequest.RequesterId)
                        };
                        friendRequests.Add(request);
                    }
                }
            });
            return friendRequests;
        }

        private string GetUsernameById(Guid userId) 
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user is null)
            {
                throw new Exception("There is no such a user.");
            }
            return user.Username;
        }

    }
}
