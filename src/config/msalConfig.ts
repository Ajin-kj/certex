// src/config/msalConfig.ts

export const msalConfig = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || "", // Client ID from environment
      authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_TENANT_ID}`, // Tenant ID from environment
      redirectUri: process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI || "", // Redirect URI from environment
    },
  };
  