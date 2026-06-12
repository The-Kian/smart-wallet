import { render, screen, userEvent } from "@testing-library/react-native";

import { usePotsStore } from "../../store/usePotsStore";
import { useWalletStore } from "@/features/wallet/store/useWalletStore";
import ManagePotModal from ".";

describe("ManagePotModal", () => {
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

  it("calls onClose when cancel is pressed", async () => {
    const onClose = jest.fn();

    await render(<ManagePotModal onClose={onClose} potId="pot-1" />);
    await userEvent.press(screen.getByTestId("close-button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renames a pot", async () => {
    await render(<ManagePotModal onClose={() => {}} potId="pot-1" />);

    await userEvent.clear(screen.getByPlaceholderText("Pot name"));
    await userEvent.type(screen.getByPlaceholderText("Pot name"), "Emergency");
    await userEvent.press(screen.getByText("Rename Pot"));

    expect(usePotsStore.getState().pots).toContainEqual(
      expect.objectContaining({ id: "pot-1", name: "Emergency" }),
    );
  });

  it("deposits funds into a pot", async () => {
    await render(<ManagePotModal onClose={() => {}} potId="pot-1" />);

    await userEvent.type(screen.getByPlaceholderText("Amount"), "5000");
    await userEvent.press(screen.getByText("Deposit"));

    expect(usePotsStore.getState().pots).toContainEqual(
      expect.objectContaining({ id: "pot-1", balance: 20_000 }),
    );
    expect(useWalletStore.getState().balance).toBe(80_000);
  });

  it("withdraws funds from a pot", async () => {
    await render(<ManagePotModal onClose={() => {}} potId="pot-1" />);

    await userEvent.type(screen.getByPlaceholderText("Amount"), "3000");
    await userEvent.press(screen.getByText("Withdraw"));

    expect(usePotsStore.getState().pots).toContainEqual(
      expect.objectContaining({ id: "pot-1", balance: 12_000 }),
    );
    expect(useWalletStore.getState().balance).toBe(88_000);
  });

  it("deletes a pot and closes the modal", async () => {
    const onClose = jest.fn();

    await render(<ManagePotModal onClose={onClose} potId="pot-1" />);
    await userEvent.press(screen.getByText("Delete Pot"));

    expect(usePotsStore.getState().pots).not.toContainEqual(
      expect.objectContaining({ id: "pot-1" }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
