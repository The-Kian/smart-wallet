import { render, screen } from "@testing-library/react-native";

import Pots from "./pots";

describe("Pots Tab", () => {
  it("renders the placeholder screen correctly", async () => {
    await render(<Pots />);
    expect(screen.getByText("Pots")).toBeTruthy();
    expect(
      screen.getByText("Track your savings goals and stash money in dedicated pots.")
    ).toBeTruthy();
  });
});
