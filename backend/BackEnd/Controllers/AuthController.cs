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

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {

            var users = _context.Users.ToList();
            User foundUser = null;


            foreach (var user in users)
            {
                if (BCrypt.Net.BCrypt.Verify(loginDto.email, user.Email))
                {
                    foundUser = user;
                    break; // Exit the loop since you found the user
                }
            }

            if (foundUser == null)
            {
                return BadRequest("User does not exist.");
            }

            if (BCrypt.Net.BCrypt.Verify(loginDto.password, foundUser.Password))
            {
                HttpContext.Session.SetString("walletId", foundUser.Id.ToString());
                return Ok();
            }
            return BadRequest("Wrong username or password.");
        }

    }
}