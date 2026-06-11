import { useWalletStore } from "./useWalletStore";

describe("useWalletStore", () => {
  beforeEach(() => {
    useWalletStore.setState({
      balance: 50_000,
      transactions: [],
      error: null,
    });

    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-06-11T12:00:00.000Z"));
    jest.spyOn(Math, "random").mockReturnValue(0.123456789);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("records a debit transaction and updates the running balance", () => {
    useWalletStore.getState().executeTransaction(2_500, "Coffee", "debit");

    const state = useWalletStore.getState();

    expect(state.balance).toBe(47_500);
    expect(state.error).toBeNull();
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0]).toMatchObject({
      description: "Coffee",
      amount: 2_500,
      type: "debit",
      runningBalance: 47_500,
      date: "2026-06-11T12:00:00.000Z",
    });
  });

  it("declines debits that exceed the balance", () => {
    useWalletStore.getState().executeTransaction(60_000, "Rent", "debit");

    const state = useWalletStore.getState();

    expect(state.balance).toBe(50_000);
    expect(state.transactions).toHaveLength(0);
    expect(state.error).toBe("Insufficient funds. Transaction declined.");
  });

  it("clears the error state", () => {
    useWalletStore.setState({
      error: "Insufficient funds. Transaction declined.",
    });

    useWalletStore.getState().clearError();

    expect(useWalletStore.getState().error).toBeNull();
  });
});