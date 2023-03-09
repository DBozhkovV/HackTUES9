using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class Likes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid LikeId { get; set; }
        public int Id { get; set; }
        public Guid FeedId { get; set; }
        public virtual Feed Feed { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
