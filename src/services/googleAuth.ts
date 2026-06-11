import * as AuthSession from "expo-auth-session";
import { UserProfile } from "../store/useAuthStore";

// Google OAuth Configuration
// Replace with your actual Google OAuth Client ID (Web)
// Get it from: https://console.cloud.google.com/
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export const useGoogleAuthRequest = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
      redirectUri: AuthSession.getRedirectUrl(),
      responseType: AuthSession.ResponseType.Token,
      usePKCE: false,
    },
    discovery,
  );

  return { request, response, promptAsync };
};

export const fetchGoogleUserProfile = async (
  accessToken: string,
): Promise<UserProfile | null> => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();

    return {
      name: data.name,
      email: data.email,
      avatarUrl: data.picture,
    };
  } catch (error) {
    console.error("Error fetching Google user profile:", error);
    return null;
  }
};

export const revokeGoogleToken = async (token: string) => {
  try {
    await fetch("https://oauth2.googleapis.com/revoke", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `token=${token}`,
    });
  } catch (error) {
    console.error("Error revoking token:", error);
  }
};
