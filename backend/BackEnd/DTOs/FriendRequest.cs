namespace BackEnd.DTOs
{
    public class FriendRequest
    {
        public Guid FriendshipId { get; set; }
        
        public string Username { get; set; }
        public Guid FriendId { get; set; }
        public FriendRequest() 
        {
        }
    }
}
