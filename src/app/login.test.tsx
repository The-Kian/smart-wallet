import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

import LoginScreen from "./login";

const mockPromptAsync = jest.fn();
const mockSignIn = jest.fn();
const mockFetchProfile = jest.fn();
const mockUseAuthRequest = jest.fn();

jest.mock("expo-auth-session", () => ({
  ResponseType: { Token: "token" },
  makeRedirectUri: jest.fn(() => "mock-redirect-uri"),
  useAuthRequest: (...args: unknown[]) => mockUseAuthRequest(...args),
}));

jest.mock("../services/googleAuth", () => ({
  fetchGoogleUserProfile: (...args: unknown[]) => mockFetchProfile(...args),
}));

jest.mock("../features/auth/store/useAuthStore", () => ({
  useAuthStore: () => ({ signIn: mockSignIn }),
}));

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthRequest.mockReturnValue([null, null, mockPromptAsync]);
  });

  it("starts the Google sign-in flow when the primary button is pressed", async () => {
    await render(<LoginScreen />);

    const button = screen.getByText("Sign In with Google");
    expect(button).toBeOnTheScreen();

    fireEvent.press(button);

    expect(mockPromptAsync).toHaveBeenCalledTimes(1);
  });

  it("signs in with the sandbox profile when the bypass button is pressed", async () => {
    await render(<LoginScreen />);
    const button = screen.getByText(
      "Bypass with Sandbox Profile (Simulator / Web)",
    );

    expect(button).toBeOnTheScreen();
    fireEvent.press(button);

    expect(mockSignIn).toHaveBeenCalledWith({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl:
        "https://gratisography.com/wp-content/uploads/2025/05/gratisography-moon-robot-1035x780.jpg",
    });
  });

  it("fetches the profile and signs in after a successful auth response", async () => {
    mockUseAuthRequest.mockReturnValue([
      null,
      { type: "success", params: { access_token: "access-token" } },
      mockPromptAsync,
    ]);
    mockFetchProfile.mockResolvedValue({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl: "https://example.com/avatar.png",
    });

    render(<LoginScreen />);

    await waitFor(() => {
      expect(mockFetchProfile).toHaveBeenCalledWith("access-token");
    });
    expect(mockSignIn).toHaveBeenCalledWith({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl: "https://example.com/avatar.png",
    });
  });
});
