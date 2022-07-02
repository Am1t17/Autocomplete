using AutoComplete.API.Data;
using AutoComplete.API.Models;
using Cities.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Cities.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class CitiesController : Controller
    {
        private readonly CitiesService citiesService;
        public CitiesController(CitiesDbContext citiesDbContext)
        {
            this.citiesService = new CitiesService(citiesDbContext);
        }


        [HttpGet("AutoComplete")]
        public  ActionResult<IQueryable<City>> AutoCompleteSearch([FromQuery] string? substring = "", [FromQuery] int limit = 10)
        {
            try
            {
                if (string.IsNullOrEmpty(substring))
                    substring = "";
                var results = citiesService.AutoCompleteSearch(substring, limit);
                return Ok(results);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCityById([FromRoute] string id, CancellationToken cancellationToken)
        {
            try
            {
                if (!int.TryParse(id, out int cityId))
                {
                    return BadRequest("could not convert: " + id + " to integer");
                }
                var city = await citiesService.GetCityById(cityId, cancellationToken);
                if (city == null)
                {
                    return NotFound("Sorry. Id not found: " + id.ToString());
                }
                return Ok(city);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
