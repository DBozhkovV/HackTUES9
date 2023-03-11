using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto.Generators;

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
            var personalId = _context.IdSimolations.Find(registerDTO);
            if (personalId != null)
            {
                User user = new User()
                {
                    WalletId = BCrypt.Net.BCrypt.HashPassword(registerDTO.WalletId),
                    Email = BCrypt.Net.BCrypt.HashPassword(registerDTO.Email),
                    Username = registerDTO.Username,
                    Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password)
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            else 
            { 
                return BadRequest("This is not valid Id,pls enter valid Id");
            }
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDto)
        {
            if (HttpContext.Session.GetString("userId") != null)
            {
                return BadRequest("Have an exist session.");
            }

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
                HttpContext.Session.SetString("userId", foundUser.Id.ToString());
                return Ok();
            }
            return BadRequest("Wrong username or password.");
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            if (HttpContext.Session.GetString("userId") is null)
            {
                return BadRequest("Don't have exist session.");
            }
            Response.Cookies.Delete("ASP");
            HttpContext.Session.Remove("userId");
            HttpContext.Session.Clear();
            return Ok();
        }

    }
}