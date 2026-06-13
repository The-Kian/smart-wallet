import { useWalletStore } from "../../wallet/store/useWalletStore";
import { usePotsStore } from "./usePotsStore";

describe("usePotsStore", () => {
  beforeEach(() => {
    usePotsStore.setState({
      pots: [
        {
          id: "pot-0",
          name: "Savings",
          balance: 25_000,
        },
      ],
      error: null,
    });
    useWalletStore.setState({
      balance: 100_000,
      transactions: [],
      error: null,
    });
  });

  it("allows adding a new pot", () => {
    const newPot = {
      id: "pot-1",
      name: "Holiday Fund",
      balance: 100_000,
    };

    usePotsStore.getState().addPot(newPot);

    const state = usePotsStore.getState();

    expect(state.pots).toContainEqual(newPot);
    expect(state.error).toBeNull();
  });

  it("allows deleting a pot and funds return to wallet", () => {
    const mainBalance = useWalletStore.getState().balance;
    usePotsStore.getState().deletePot("pot-0");

    const state = usePotsStore.getState();

    expect(state.pots).not.toContainEqual(
      expect.objectContaining({ id: "pot-0" }),
    );
    expect(state.error).toBeNull();
    const updatedBalance = useWalletStore.getState().balance;
    expect(updatedBalance).toBe(mainBalance + 25_000);
  });

  it("allows transferring funds to a pot and deducts from main wallet balance", () => {
    const mainBalance = useWalletStore.getState().balance;
    const newPot = {
      id: "pot-2",
      name: "Vacation",
      balance: 20_000,
    };

    usePotsStore.getState().addPot(newPot);

    const state = usePotsStore.getState();

    expect(state.pots).toContainEqual(newPot);
    expect(useWalletStore.getState().balance).toBe(mainBalance - 20_000);
  });

  it("allows transferring funds from a pot back to the main wallet balance", () => {
    const mainBalance = useWalletStore.getState().balance;

    usePotsStore.getState().addPot({
      id: "pot-2",
      name: "Vacation",
      balance: 20_000,
    });
    usePotsStore.getState().transferToWallet("pot-2", 10_000);

    const state = usePotsStore.getState();

    expect(state.pots).toContainEqual(
      expect.objectContaining({ id: "pot-2", balance: 10_000 }),
    );
    expect(useWalletStore.getState().balance).toBe(mainBalance - 10_000);
  });

  it("allows transferring funds from wallet to an existing pot", () => {
    const mainBalance = useWalletStore.getState().balance;

    usePotsStore.getState().transferToPot("pot-0", 5_000);

    expect(usePotsStore.getState().pots).toContainEqual(
      expect.objectContaining({ id: "pot-0", balance: 30_000 }),
    );
    expect(useWalletStore.getState().balance).toBe(mainBalance - 5_000);
  });

  it("allows renaming an existing pot", () => {
    usePotsStore.getState().renamePot("pot-0", "Emergency Fund");

    expect(usePotsStore.getState().pots).toContainEqual(
      expect.objectContaining({ id: "pot-0", name: "Emergency Fund" }),
    );
    expect(usePotsStore.getState().error).toBeNull();
  });

  it("returns an error when trying to add a pot with insufficient funds", () => {
    const mainBalance = useWalletStore.getState().balance;
    const newPot = {
      id: "pot-3",
      name: "Luxury Car",
      balance: mainBalance + 10_000,
    };

    usePotsStore.getState().addPot(newPot);

    const state = usePotsStore.getState();

    expect(state.pots).not.toContainEqual(newPot);
    expect(state.error).toBe("Insufficient funds to create this pot.");
  });

  it("prevents adding a pot with a duplicate name (case-insensitive)", () => {
    const duplicatePot = {
      id: "pot-4",
      name: "savings", // "Savings" already exists as pot-0
      balance: 10_000,
    };

    const success = usePotsStore.getState().addPot(duplicatePot);

    expect(success).toBe(false);
    expect(usePotsStore.getState().pots).toHaveLength(1);
    expect(usePotsStore.getState().error).toBe(
      "A pot with this name already exists.",
    );
  });

  it("prevents renaming a pot to a duplicate name (case-insensitive)", () => {
    // Add another pot first
    usePotsStore.getState().pots.push({
      id: "pot-1",
      name: "Holidays",
      balance: 10_000,
    });

    const success = usePotsStore.getState().renamePot("pot-1", " SAVINGS "); // extra spaces, case-insensitive

    expect(success).toBe(false);
    expect(usePotsStore.getState().error).toBe(
      "A pot with this name already exists.",
    );
  });

  it("returns true on successfully performing actions", () => {
    const successAdd = usePotsStore.getState().addPot({
      id: "pot-5",
      name: "Unique Goal",
      balance: 5_000,
    });
    expect(successAdd).toBe(true);

    const successRename = usePotsStore
      .getState()
      .renamePot("pot-5", "Updated Unique Goal");
    expect(successRename).toBe(true);

    const successTransferToPot = usePotsStore
      .getState()
      .transferToPot("pot-5", 2_000);
    expect(successTransferToPot).toBe(true);

    const successTransferToWallet = usePotsStore
      .getState()
      .transferToWallet("pot-5", 1_000);
    expect(successTransferToWallet).toBe(true);
  });
});
