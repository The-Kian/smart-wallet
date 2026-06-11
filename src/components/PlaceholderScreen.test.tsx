import { screen, render } from "@testing-library/react-native";

import { PlaceholderScreen } from "./PlaceholderScreen";

describe("PlaceholderScreen", () => {
  it("renders the provided title and description", async () => {
    await render(
      <PlaceholderScreen
        title="Wallet"
        description="Your wallet overview will live here."
      />
    );

    expect(screen.getByText("Wallet")).toBeTruthy();
    expect(screen.getByText("Your wallet overview will live here.")).toBeTruthy();
  });
});