import 'dotenv/config'
import { DeviceCodeCredential, InteractiveBrowserCredential, ClientSecretCredential } from "@azure/identity";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { Client, AuthProvider } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";




async function main() {
  
  const CLIENT_ID = process.env.CLIENT_ID
  const TENANT_ID = process.env.TENANT_ID
  const REDIRECT_URI = process.env.REDIRECT_URI
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  
  // // @azure/identity
  // const credential = new InteractiveBrowserCredential({
  //   tenantId: TENANT_ID,
  //   clientId: CLIENT_ID,
  //   redirectUri: REDIRECT_URI,
  // });

  // // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
  // const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  //   scopes: ['User.Read'],
  // });
  
  // @azure/identity
  const credential = new ClientSecretCredential(
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET
  );

  // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    // The client credentials flow requires that you request the
    // /.default scope, and pre-configure your permissions on the
    // app registration in Azure. An administrator must grant consent
    // to those permissions beforehand.
    scopes: ['https://graph.microsoft.com/.default'],
  });

  const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
  
  graphClient.api("/communications/calls").post({})

  // const user = await graphClient.api('/me').get()
  // console.log('user')
  // console.log(user)
}

main()