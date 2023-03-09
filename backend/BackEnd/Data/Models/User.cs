using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Models
{
    public class User
    {
        [Key]
        public string Id;

        [Required]
        public string Username;

        [Required]
        public string Email;

        [Required]
        public string Password;
    }
}
