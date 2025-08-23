using backend.Data;
using backend.Interfaces;
using backend.Model;
using backend.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using Service;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 8;

}).AddEntityFrameworkStores<ApplicationDbContext>();


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    options.DefaultChallengeScheme =
    options.DefaultForbidScheme =
    options.DefaultScheme =
    options.DefaultSignInScheme =
    options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!)
        )
    }
);
builder.Services.AddAuthorization();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        
    )
);
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}
app.UseCors("AllowViteApp");
app.MapControllers();
app.UseHttpsRedirection();
app.Run();

