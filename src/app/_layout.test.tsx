import { render, waitFor, screen } from "@testing-library/react-native";

import RootLayout from "./_layout";

const mockReplace = jest.fn();

let mockSegments: string[] = ["home"];
let mockAuthState = {
  isAuthenticated: false,
  isHydrated: false,
};

jest.mock("expo-router", () => ({
  Slot: () => null,
  useRouter: () => ({ replace: mockReplace }),
  useSegments: () => mockSegments,
}));

jest.mock("../store/useAuthStore", () => ({
  useAuthStore: () => mockAuthState,
}));

describe("RootLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSegments = ["home"];
    mockAuthState = {
      isAuthenticated: false,
      isHydrated: false,
    };
  });

  it("shows a loading state until hydration is complete", async () => {
    await render(<RootLayout />);

    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("redirects unauthenticated users away from protected routes", async () => {
    mockAuthState = {
      isAuthenticated: false,
      isHydrated: true,
    };

    await render(<RootLayout />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/login");
    });
  });

  it("redirects authenticated users away from the login route", async () => {
    mockSegments = ["login"];
    mockAuthState = {
      isAuthenticated: true,
      isHydrated: true,
    };

    await render(<RootLayout />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/(tabs)");
    });
  });
});