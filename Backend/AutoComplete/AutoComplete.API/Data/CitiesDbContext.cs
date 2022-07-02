using AutoComplete.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoComplete.API.Data
{
    public class CitiesDbContext : DbContext
    {
        public CitiesDbContext(DbContextOptions<CitiesDbContext> options) : base(options)
        {
        }

        //DbSet
        public DbSet<City> Cities { get; set; }
        
        public IQueryable<City> AutoCompleteSearch(string substring,  int limit)
        {
            return Cities.
                Where(city => city.CityName.StartsWith(substring)).
                Take(limit);
        }

        public  async Task<City?> GetCityById(int id, CancellationToken cancellationToken)
        {
            return await Cities.SingleOrDefaultAsync(c => c.Id == id, cancellationToken);
        }
    }
}
