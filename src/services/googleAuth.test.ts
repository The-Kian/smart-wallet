import { fetchGoogleUserProfile, revokeGoogleToken } from "./googleAuth";

describe("googleAuth", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("maps the Google profile payload into the app user profile shape", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        name: "Kian Popat",
        email: "kian.popat@example.com",
        picture: "https://example.com/avatar.png",
      }),
    } as Response);

    await expect(fetchGoogleUserProfile("access-token")).resolves.toEqual({
      name: "Kian Popat",
      email: "kian.popat@example.com",
      avatarUrl: "https://example.com/avatar.png",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: { Authorization: "Bearer access-token" },
      },
    );
  });

  it("returns null when the profile request fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
    } as Response);

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    await expect(fetchGoogleUserProfile("bad-token")).resolves.toBeNull();
    expect(errorSpy).toHaveBeenCalled();
  });

  it("revokes a Google token with the revoke endpoint", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
    } as Response);

    await revokeGoogleToken("token-to-revoke");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://oauth2.googleapis.com/revoke",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "token=token-to-revoke",
      },
    );
  });
});