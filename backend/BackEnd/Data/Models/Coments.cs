using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class Coments
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ComentsId { get; set; }
        public string Coment { get; set; }
        public Guid FeedId { get; set; }
        public virtual Feed Feed { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
    }
}
