namespace projectO.api.DTO
{
    public record class GamesDto(
        int Id,
        string Name,
        string Genre,
        DateOnly ReleaseDate
    );
   
}
