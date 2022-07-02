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

        public async Task<List<City>> AutoCompleteSearch(string substring, int limit, CancellationToken ct)
        {
            return  await citiesDbContext.Cities
                .Where(city => city.CityName.StartsWith(substring))
                .Take(limit).ToListAsync<City>(ct);
        }

        public async Task<City?> GetCityById(int id, CancellationToken ct)
        {
            return await citiesDbContext.Cities.SingleOrDefaultAsync(c => c.Id == id, ct);
        }
    }
}
