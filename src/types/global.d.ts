declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MSAL_CLIENT_ID: string;
    NEXT_PUBLIC_MSAL_TENANT_ID: string;
    NEXT_PUBLIC_MSAL_REDIRECT_URI: string;
    NEXT_PUBLIC_API_URL: string;
  }
}