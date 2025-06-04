import { InteractionRequiredAuthError } from "@azure/msal-browser";

async function getAccessToken(msalInstance: any, account: any): Promise<string> {
  const request = {
    scopes: ["User.Read", "User.Read.All"],
    account,
  };

  try {
    // Try to get the token silently first
    const tokenResponse = await msalInstance.acquireTokenSilent(request);
    return tokenResponse.accessToken;
  } catch (error) {
    // If interaction is required, fall back to popup
    if (error instanceof InteractionRequiredAuthError) {
      const tokenResponse = await msalInstance.acquireTokenPopup(request);
      return tokenResponse.accessToken;
    } else {
      throw error;
    }
  }
}

export async function fetchExtendedUserData(msalInstance: any) {
  try {
    const account = msalInstance.getActiveAccount();
    if (!account) {
      throw new Error("No active account found");
    }

    // Get the access token using the helper function
    const accessToken = await getAccessToken(msalInstance, account);

    // Fetch basic user profile
    const profileResponse = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const userProfile = await profileResponse.json();

    // Attempt to fetch the manager's profile (if available)
    let managerProfile = null;
    try {
      const managerResponse = await fetch("https://graph.microsoft.com/v1.0/me/manager", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (managerResponse.ok) {
        managerProfile = await managerResponse.json();
      }
    } catch (error) {
      console.warn("Manager data not available", error);
    }

    return { userProfile, managerProfile };
  } catch (error) {
    console.error("Error retrieving extended user data:", error);
    throw error;
  }
}
