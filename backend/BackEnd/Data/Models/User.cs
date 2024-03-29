﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Data.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string WalletId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public User() 
        {
        }
    }
}
