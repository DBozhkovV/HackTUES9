using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class ChatMessage
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid SenderId { get; set; }

        [Required]
        public Guid ReceiverId { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public DateTime DateTimeSent { get; set; }
    }

}
