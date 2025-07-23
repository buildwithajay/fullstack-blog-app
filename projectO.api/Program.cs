using projectO.api.EndPoints;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapGamesEndPoints();

app.Run();
