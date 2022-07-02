using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace AutoComplete.API.Models
{
    [Index(nameof(CityName),IsUnique = true)]
    public class City
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string CityName { get; set; }

    }
}
