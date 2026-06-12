import { render, screen } from "@testing-library/react-native";
import { useWalletStore } from "../features/wallet/store/useWalletStore";
import WalletScreen from "./WalletScreen";

describe("WalletScreen", () => {
  beforeEach(() => {
    useWalletStore.setState({
      balance: 50_000,
      transactions: [],
      error: null,
    });
  });

  it("renders the seeded balance and ledger heading", async () => {
    await render(<WalletScreen />);

    const balanceText = screen.getByText(/Total Balance/i);
    const balanceValue = screen.getByText("£500.00");
    const ledgerHeading = screen.getByText(/Recent Activity/i);

    expect(balanceText).toBeOnTheScreen();
    expect(balanceValue).toBeOnTheScreen();
    expect(ledgerHeading).toBeOnTheScreen();
  });

  it("displays the transaction history with running balance", async () => {
    useWalletStore.setState({
      transactions: [
        {
          id: "txn-1",
          date: "2026-06-11T12:00:00.000Z",
          description: "Coffee",
          amount: 2500,
          runningBalance: 47500,
          type: "debit",
        },
      ],
    });

    await render(<WalletScreen />);

    expect(screen.getByText("Coffee")).toBeOnTheScreen();
    expect(screen.getByText(/11 Jun/i)).toBeOnTheScreen();
    expect(screen.getByText(/Bal: £475.00/i)).toBeOnTheScreen();
    expect(screen.getByText("-£25.00")).toBeOnTheScreen();
  });

  it("shows the overdraw error banner when the wallet rejects a debit", async () => {
    useWalletStore.setState({
      error: "Insufficient funds. Transaction declined.",
    });

    await render(<WalletScreen />);

    expect(
      screen.getByText("Insufficient funds. Transaction declined."),
    ).toBeOnTheScreen();
    expect(screen.getByText("Dismiss")).toBeOnTheScreen();
  });
});
