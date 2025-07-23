using System.ComponentModel.DataAnnotations;

namespace projectO.api.DTO
{
    public record class UpdateGameDto(
       [Required] [StringLength(50)] string Name,
        [Required]string Genre,
        DateOnly ReleaseDate
    );
   
}
