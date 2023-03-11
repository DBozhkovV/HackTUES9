using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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

            var token = GenerateJWTtoken(foundUser);


            if (BCrypt.Net.BCrypt.Verify(loginDto.password, foundUser.Password))
            {
                return Ok(token);
            }
            return BadRequest("Wrong username or password.");
        }

        private string GenerateJWTtoken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("yr5Yz2QWxxwxe9hkvu4t4RfRHIMwPiEFDv442B6v"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Username)
            };

            var token = new JwtSecurityToken("https://localhost:7160", "https://localhost:7160",
                claims,
                expires: DateTime.Now.AddMinutes(20),
                signingCredentials: credentials);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

    }
}