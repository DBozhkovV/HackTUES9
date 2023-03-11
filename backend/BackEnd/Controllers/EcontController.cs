using Amazon.S3;
using BackEnd.Data;
using BackEnd.Data.Models;
using BackEnd.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EcontController : ControllerBase
    {
        private DataContext _context;

        public EcontController(DataContext dataContext)
        {
            _context = dataContext;

        }
        [HttpPost("/CreateTovaritelnica")]
        public async Task<IActionResult> CreateT([FromForm]EcontDto econtDto) {
            if (HttpContext.Session.GetString("userId") == null) { return BadRequest("You have to be loged In"); }
            var tovaritelnica = new Econt()
            {
                shipmentId = econtDto.shipmentId,
                cityName = econtDto.cityName,
                countryCode = econtDto.countryCode,
                shipmentDescription = econtDto.shipmentDescription,
                street=econtDto.street,
                streetNumber = econtDto.streetNumber,
                userName = econtDto.userName,
                phoneNumber = econtDto.phoneNumber,
                postCode = econtDto.postCode,

            };
            _context.Econt.Add(tovaritelnica);
            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpDelete("/DeleteTovaritelnica")]
        public async Task<IActionResult> DeleteT(string id) {
            if (HttpContext.Session.GetString("userId") == null) { return BadRequest("You have to be loged In"); }
            var tov = _context.Econt.Find(id);
            _context.Econt.Remove(tov);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("GetEcont")]
        public async Task<IActionResult> GetEcont(string id) {
            if (HttpContext.Session.GetString("userId") == null) { return BadRequest("You have to be loged In"); }
            var tov = _context.Econt.Find(id);
            return Ok(tov);
        }
    }
}
