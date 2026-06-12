import { render, screen, userEvent } from "@testing-library/react-native";

import { usePotsStore } from "../features/pots/store/usePotsStore";
import { useWalletStore } from "../features/wallet/store/useWalletStore";
import PotsScreen from "./PotsScreen";


describe("PotsScreen", () => {
  beforeEach(() => {
    usePotsStore.setState({
      pots: [
        {
          id: "pot-1",
          name: "Holiday",
          balance: 15_000,
        },
      ],
      error: null,
    });
    useWalletStore.setState({
      balance: 85_000,
      transactions: [],
      error: null,
    });
  });

  it("renders the wallet balance and all pots", async () => {
    await render(<PotsScreen />);

    expect(screen.getByText("Pots")).toBeOnTheScreen();
    expect(
      screen.getByText(
        "Track your savings goals and stash money in dedicated pots.",
      ),
    ).toBeOnTheScreen();
    expect(screen.getByText("Main wallet balance")).toBeOnTheScreen();
    expect(screen.getByText("£850.00")).toBeOnTheScreen();
    expect(screen.getByText("Holiday")).toBeOnTheScreen();
    expect(screen.getByText("£150.00")).toBeOnTheScreen();
  });
});
describe("PotsScreen", () => {
  it("renders the placeholder screen correctly", async () => {
    await render(<PotsScreen />);
    expect(screen.getByText("Pots")).toBeOnTheScreen();
    expect(
      screen.getByText(
        "Track your savings goals and stash money in dedicated pots.",
      ),
    ).toBeOnTheScreen();
  });

  it("displays the main wallet balance", async () => {
    useWalletStore.setState({
      balance: 123_456,
      transactions: [],
      error: null,
    });
    await render(<PotsScreen />);
    expect(screen.getByText("£1,234.56")).toBeOnTheScreen();
  });

  it("brings up the modal to add a new pot", async () => {
    await render(<PotsScreen />);
    const addButton = screen.getByText("Add Pot");
    expect(addButton).toBeOnTheScreen();
    await userEvent.press(addButton);
    expect(screen.getByText("Create a new pot")).toBeOnTheScreen();
  });
});
