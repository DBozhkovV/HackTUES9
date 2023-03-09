namespace BackEnd.DTOs
{
    public class ComentDto
    {
        public string Coment { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
