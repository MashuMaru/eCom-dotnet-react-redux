using IdentityServer4.Models;

namespace API.Authentication;

public class Config
{
    public static IEnumerable<ApiScope> GetScopes()
    {
        return new List<ApiScope>
        {
            new("api", "Full access to API"),
        };
    }
    
    /* For in memory clients. */
    // public static IEnumerable<Client> GetClients()
    // {
    //     return new List<Client>
    //     {
    //         new()
    //         {
    //             ClientId = "testClientId",
    //             RequireClientSecret = true,
    //             AllowedGrantTypes = GrantTypes.ClientCredentials,
    //             AllowedScopes = { "api" },
    //             ClientSecrets =
    //             {
    //                 new Secret("secretTest1".Sha256())
    //             }
    //         }
    //     };
    // }
}