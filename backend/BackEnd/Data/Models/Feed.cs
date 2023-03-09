using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class Feed
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid FeedId { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Likes> Likes { get; set; }
        public virtual ICollection<Coments> Coments { get; set; }

    }
}
