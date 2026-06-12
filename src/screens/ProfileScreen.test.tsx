import { Alert } from "react-native";
import { render, fireEvent, screen } from "@testing-library/react-native";

import Profile from "./ProfileScreen";

const mockReplace = jest.fn();
const mockSignOut = jest.fn();

let mockAuthState: {
  user: null | {
    name: string;
    email: string;
    avatarUrl: string;
  };
  signOut: typeof mockSignOut;
};

jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

jest.mock("expo-image", () => ({
  Image: () => null,
}));

jest.mock("../features/auth/store/useAuthStore", () => ({
  useAuthStore: () => mockAuthState,
}));

describe("Profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthState = {
      user: null,
      signOut: mockSignOut,
    };
  });

  it("shows a fallback message when no user is available", async () => {
     await render(<Profile />);
    
    expect(screen.getByText("User information not available")).toBeTruthy();
  });

  it("renders the user profile details", async () => {
    mockAuthState = {
      user: {
        name: "Kian Popat",
        email: "kian.popat@example.com",
        avatarUrl: "https://example.com/avatar.png",
      },
      signOut: mockSignOut,
    };

    await render(<Profile />);
    
    expect(screen.getByText("Profile")).toBeTruthy();
    expect(screen.getByText("Kian Popat")).toBeTruthy();
    expect(screen.getByText("kian.popat@example.com")).toBeTruthy();
  });

  it("signs out and navigates back to login after confirming", async () => {
    mockAuthState = {
      user: {
        name: "Kian Popat",
        email: "kian.popat@example.com",
        avatarUrl: "https://example.com/avatar.png",
      },
      signOut: mockSignOut,
    };

    const alertSpy = jest
      .spyOn(Alert, "alert")
      .mockImplementation((_, __, buttons) => {
        buttons?.[1]?.onPress?.();
      });

    await render(<Profile />);
    const button = screen.getByText("Sign Out");
    expect(button).toBeTruthy();
    
    fireEvent.press(button);

    expect(alertSpy).toHaveBeenCalledWith(
      "Sign Out",
      "Are you sure you want to sign out?",
      expect.any(Array),
    );
    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });
});