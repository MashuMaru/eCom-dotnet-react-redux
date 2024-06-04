using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Authentication;

public class ApiKeyAuthFilter : IAuthorizationFilter
{
    private readonly IConfiguration _configuration;

    public ApiKeyAuthFilter(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue(AuthConstants.ApiKeyHeader, out var extractedApiKey))
        {
            context.Result = new UnauthorizedObjectResult(new ProblemDetails
            {
                Extensions = new Dictionary<string, object>
                {
                    { "error", "API key not provided." }
                },
                Title = "Authorization Error.",
                Detail = "See error for details.",
                Status = StatusCodes.Status401Unauthorized
            });
            return;
        }

        var providedApiKey = _configuration.GetValue<string>(AuthConstants.ApiKeySection);

        if (!providedApiKey.Equals(extractedApiKey))
        {
            context.Result = new UnauthorizedObjectResult(new ProblemDetails
            {
                Extensions = new Dictionary<string, object>
                {
                    { "error", "Incorrect API key provided" }
                },
                Title = "Authorization Error.",
                Detail = "See error for details.",
                Status = StatusCodes.Status401Unauthorized
            });
        }
    }
}