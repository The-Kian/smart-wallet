import { render, screen } from "@testing-library/react-native";

import Shop from "./shop";

describe("Shop Tab", () => {
  it("renders the placeholder screen correctly", async () => {
    await render(<Shop />);
    expect(screen.getByText("Shop")).toBeTruthy();
    expect(screen.getByText("Browse products and offers tailored to your budget.")).toBeTruthy();
  });
});
