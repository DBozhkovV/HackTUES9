using BackEnd.DTOs;

namespace BackEnd.Services
{
    public interface IUserService
    {
        List<FriendRequest> GetFriendRequests(Guid userId);

        List<FriendRequest> GetFriends(Guid userId);
    }
}
