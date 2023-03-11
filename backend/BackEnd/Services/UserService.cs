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
                            Username = GetUsernameById(friendRequest.RequesterId),
                            FriendId = friendRequest.RequesterId
                        };
                        friendRequests.Add(request);
                    }
                }
            });
            return friendRequests;
        }

        public List<FriendRequest> GetFriends(Guid userId) 
        {
            List<FriendRequest> friends = new List<FriendRequest>();
            _context.Friendships.ToList().ForEach(friend => {
                if (friend.ReceiverId == userId || friend.RequesterId == userId)
                {
                    if (friend.status == RequestStatus.Accepted)
                    {
                        FriendRequest request = new FriendRequest();
                        if (friend.RequesterId == userId)
                        {
                            request.FriendshipId = friend.Id;
                            request.Username = GetUsernameById(friend.ReceiverId);
                            request.FriendId = friend.ReceiverId;
                        } else {
                            request.FriendshipId = friend.Id;
                            request.Username = GetUsernameById(friend.RequesterId);
                            request.FriendId = friend.RequesterId;
                        }
                        friends.Add(request);
                    }
                }
            });
            return friends;
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
