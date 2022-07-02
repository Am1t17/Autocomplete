using AutoComplete.API.Data;
using AutoComplete.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cities.API.Services
{
    public class CitiesService
    {
        private readonly CitiesDbContext citiesDbContext;
        public CitiesService(CitiesDbContext citiesDbContext)
        {
            this.citiesDbContext = citiesDbContext;
        }

        public  IQueryable<City> AutoCompleteSearch(string substring, int limit)
        {
            return  citiesDbContext.Cities.
                Where(city => city.CityName.StartsWith(substring)).
                Take(limit);
        }

        public async Task<City?> GetCityById(int id, CancellationToken cancellationToken)
        {
            return await citiesDbContext.Cities.SingleOrDefaultAsync(c => c.Id == id, cancellationToken);
        }
    }
}
