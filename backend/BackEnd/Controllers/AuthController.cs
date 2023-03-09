using BackEnd.Data;
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

        /*
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterDTO registerDTO)
        {
            _context.Users
                .ToList()
                .ForEach(user => {
                    if (user.Id == registerDTO.Id)
                    {
                        return BadRequest("Wallet exits!");
                    }
                });
        }
        */
    }
}
