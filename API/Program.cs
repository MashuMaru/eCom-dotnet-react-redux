using API.Authentication;
using API.Data;
using API.Middleware;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opts =>
{
    opts.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API",
        Version = "v1",
    });

    opts.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.OAuth2,
        Flows = new OpenApiOAuthFlows
        {
            ClientCredentials = new OpenApiOAuthFlow
            {
                TokenUrl = new Uri("http://localhost:5000/connect/token"),
                Scopes = new Dictionary<string, string>
                {
                    { "api", "Integration Scope" }
                }
            }
        }
    });
    
    opts.OperationFilter<OperationsFilter>();
});



builder.Services.AddScoped<ApiKeyAuthFilter>();

var origins = "origins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: origins,
        configurePolicy: policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

builder.Services.AddDbContext<StoreContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentityServer()
    .AddDeveloperSigningCredential()
    .AddInMemoryApiScopes(Config.GetScopes())
    /* For in memory clients */
    // .AddInMemoryClients(Config.GetClients())
    .AddClientStore<OAuthClientStore>();

builder.Services.AddCors();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false
    };
    o.Authority = "http://localhost:5000";
    o.Audience = "api";
    o.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
});

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(opt =>
{
    opt.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("http://localhost:3000");
});

app.UseIdentityServer();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

/* Create scoped context for any pending Db Migrations, on Program startup. */
var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    context.Database.Migrate();
    DbInitialiser.Initialise(context);
}
catch (Exception e)
{
    logger.LogError(e, "An error occured during migration");
    throw;
}

app.Run();
