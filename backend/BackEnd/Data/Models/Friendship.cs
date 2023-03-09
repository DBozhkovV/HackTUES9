using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Data.Models
{
    public class Friendship
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid RequesterId { get; set; }

        [Required]
        public Guid ReceiverId { get; set; }

        [Required]
        public RequestStatus status { get; set; } = RequestStatus.Pending;

        public Friendship()
        {
        }
    }
}
