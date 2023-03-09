using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            if (_context.Users.Any(user => user.WalletId == registerDTO.WalletId))
            {
                return BadRequest("Wallet exists!");
            }
            if (_context.Users.Any(user => user.Email == registerDTO.Email))
            {
                return BadRequest("Email exists!");
            }
            if (_context.Users.Any(user => user.Username == registerDTO.Username))
            {
                return BadRequest("Username exists!");
            }

            User user = new User()
            {
                WalletId = BCrypt.Net.BCrypt.HashPassword(registerDTO.WalletId),
                Email = BCrypt.Net.BCrypt.HashPassword(registerDTO.Email),
                Username = BCrypt.Net.BCrypt.HashPassword(registerDTO.Username),
                Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password)
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
   
    }
}
