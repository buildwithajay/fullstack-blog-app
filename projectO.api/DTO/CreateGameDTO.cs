using System.ComponentModel.DataAnnotations;

namespace projectO.api.DTO
{
    public record class CreateGameDTO
    (
        [Required] [StringLength(50)] string Name,
        [Required]string Genre,
        DateOnly ReleaseDate
    );
}
