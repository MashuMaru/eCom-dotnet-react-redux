using IdentityServer4.Models;
using IdentityServer4.Stores;

namespace API.Authentication;

public class OAuthClientStore : IClientStore
{
    public Task<Client> FindClientByIdAsync(string clientId)
    {
        /* Get client by clientId in database */
        var client = clientId == "testClientId"
            ? new Client
            {
                ClientId = clientId,
                AllowedScopes = { "api" },
                RequireClientSecret = true,
                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = { new Secret("secretTest1".Sha256()) }
            }
            : new Client();
        
        return Task.FromResult(client);
    }
}