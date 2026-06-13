import { useWalletStore } from "../../wallet/store/useWalletStore";
import { useVouchersStore } from "./useVouchersStore";

describe("useVouchersStore", () => {
  beforeEach(() => {
    useVouchersStore.setState({
      vouchers: [],
      pointsBalance: 0,
      error: null,
    });
    useWalletStore.setState({
      balance: 50_000, // £500.00
      transactions: [],
      error: null,
    });
  });

  it("handles a voucher purchase and deducts from main wallet balance in pence", () => {
    const success = useVouchersStore
      .getState()
      .purchaseVoucher("Starbucks", 1_500); // £15.00

    expect(success).toBe(true);
    expect(useWalletStore.getState().balance).toBe(48_500); // £485.00
    expect(useVouchersStore.getState().vouchers).toHaveLength(1);
    expect(useVouchersStore.getState().vouchers[0]).toMatchObject({
      title: "Starbucks",
      faceValue: 1_500,
    });
    expect(useVouchersStore.getState().error).toBeNull();
  });

  it("calculates loyalty points correctly (1 point per whole pound spent)", () => {
    // £15.50 spent -> 15 loyalty points
    useVouchersStore.getState().purchaseVoucher("Costa", 1_550);

    expect(useVouchersStore.getState().pointsBalance).toBe(15);

    // £10.00 spent -> 10 loyalty points
    useVouchersStore.getState().purchaseVoucher("Amazon", 1_000);

    expect(useVouchersStore.getState().pointsBalance).toBe(25);
  });

  it("prevents purchasing a voucher with insufficient wallet funds", () => {
    const success = useVouchersStore
      .getState()
      .purchaseVoucher("Luxury Goods", 60_000);

    expect(success).toBe(false);
    expect(useVouchersStore.getState().error).toBe(
      "Insufficient wallet funds for this voucher purchase.",
    );
    expect(useWalletStore.getState().balance).toBe(50_000);
    expect(useVouchersStore.getState().vouchers).toHaveLength(0);
  });

  it("prevents point redemption if points balance is below 100", () => {
    useVouchersStore.setState({ pointsBalance: 75 });

    const success = useVouchersStore.getState().redeemPoints();

    expect(success).toBe(false);
    expect(useVouchersStore.getState().error).toBe(
      "You need at least 100 points to redeem.",
    );
    expect(useWalletStore.getState().balance).toBe(50_000);
  });

  it("redeems points in multiples of 100 and credits the main wallet balance in pence", () => {
    useVouchersStore.setState({ pointsBalance: 250 });

    const success = useVouchersStore.getState().redeemPoints();

    expect(success).toBe(true);
    expect(useVouchersStore.getState().pointsBalance).toBe(50); // 200 points redeemed, 50 left
    expect(useWalletStore.getState().balance).toBe(50_200);
    expect(useVouchersStore.getState().error).toBeNull();
  });
});
