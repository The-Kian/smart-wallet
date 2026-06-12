import { useAuthStore } from "./useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
    });
  });

  it("stores the user on sign in", () => {
    const user = {
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl: "https://example.com/avatar.png",
    };

    useAuthStore.getState().signIn(user);

    expect(useAuthStore.getState().user).toEqual(user);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it("clears the user on sign out", () => {
    useAuthStore.setState({
      user: {
        name: "Kian Popat",
        email: "kian.popat@example.com",
        avatarUrl: "https://example.com/avatar.png",
      },
      isAuthenticated: true,
    });

    useAuthStore.getState().signOut();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("tracks hydration state", () => {
    useAuthStore.getState().setHydrated(true);

    expect(useAuthStore.getState().isHydrated).toBe(true);
  });
});
