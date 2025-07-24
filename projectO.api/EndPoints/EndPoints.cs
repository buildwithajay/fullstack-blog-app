using projectO.api.DTO;

namespace projectO.api.EndPoints
{
    public static class EndPoints
    {
        const string ENDPOINTNAME = "getGame";
        private static readonly List<GamesDto> games = [
            new (
        1,
        "MineCraft",
        "PC",
        new DateOnly(2011, 07 , 11)
     )
            ];

        public static WebApplication MapGamesEndPoints(this WebApplication app)
        {
            app.MapGet("/", () => "Hello World!");

            app.MapGet("games", () => games);

            app.MapGet("games/{id}", (int id) =>
            {
                GamesDto? game = games.Find(game => game.Id == id);
                return game is null ? Results.NotFound() : Results.Ok(game);
            }).WithName(ENDPOINTNAME);

            app.MapPost("games", (CreateGameDTO newGame) =>
            {
                GamesDto game = new(
                    games.Count + 1,
                    newGame.Name,
                    newGame.Genre,
                    newGame.ReleaseDate
                );
                games.Add(game);
                return Results.CreatedAtRoute(ENDPOINTNAME, new { id = game.Id }, game);
            }); 

            app.MapPut("games/{id}", (int id, UpdateGameDto updateGameDto) =>
            {
                var index = games.FindIndex(game => game.Id == id);
                games[index] = new GamesDto(
                id,
                    updateGameDto.Name,
                    updateGameDto.Genre,
                    updateGameDto.ReleaseDate
                );
                return Results.NoContent();
            });

            app.MapDelete("games/{id}", (int id) =>
            {
                games.RemoveAll(game => game.Id == id);
            });
            return app;
    }
    }
    }



