using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using projectO.api.Data;
using projectO.api.Migrations;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddSqlite<BlogDbContext>(builder.Configuration.GetConnectionString("BlogInfo"));
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend", policy =>
//     {
//         policy.WithOrigins("http://localhost:5173")
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseRouting();
app.MapControllers();


// app.UseCors("AllowFrontend");
app.MapGet("/", () => "Hello World!");

// app.MapGet("/blogs",async (BlogDbContext db) =>
// {
//     var data = await db.blogs.ToListAsync();
//     return Results.Ok(data);
// });


app.Run();
