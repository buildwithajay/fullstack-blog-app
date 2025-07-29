using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using projectO.api.Data;
using projectO.api.Migrations;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddSqlite<BlogDbContext>(builder.Configuration.GetConnectionString("BlogInfo"));
var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.MapGet("/", () => "Hello World!");

app.MapGet("/blogs",async (BlogDbContext db) =>
{
    var data = await db.blogs.ToListAsync();
    return Results.Ok(data);
});
app.MapGet("/blogs/{id}", async (int id, BlogDbContext db) =>
{
    var matched = await db.blogs.FindAsync(id);
    if (matched == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(matched);
});


app.Run();
