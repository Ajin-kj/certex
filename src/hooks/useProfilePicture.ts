export async function fetchProfilePicture(msalInstance: any): Promise<string | null> {
    try {
      const account = msalInstance.getActiveAccount();
      if (!account) return null;
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ["User.Read"],
        account,
      });
      const accessToken = tokenResponse.accessToken;
      const response = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url;
      } else {
        console.error("Failed to fetch profile picture", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile picture", error);
      return null;
    }
  }
  