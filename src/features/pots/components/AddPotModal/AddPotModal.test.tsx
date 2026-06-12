import { render, screen, userEvent } from "@testing-library/react-native";
import AddPotModal from ".";
import { usePotsStore } from "../../store/usePotsStore";

const mockAddPot = jest.fn();
jest.mock("../../store/usePotsStore", () => ({
  usePotsStore: (selector?: (s: { addPot: jest.Mock }) => unknown) => {
    const state = { addPot: mockAddPot };
    return selector ? selector(state) : state;
  },
}));
const mockOnClose = jest.fn();

describe("AddPotModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders an empty form when opened", async () => {
    await render(<AddPotModal onClose={() => {}} />);
    expect(screen.getByText("Create a new pot")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("Pot name")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("Initial amount")).toBeOnTheScreen();
  });

  it("calls onClose when the modal is dismissed", async () => {
    await render(<AddPotModal onClose={mockOnClose} />);
    await userEvent.press(screen.getByTestId("close-button"));
    await expect(mockOnClose).toHaveBeenCalled();
  });

  it("validates form inputs and shows errors", async () => {
    await render(<AddPotModal onClose={() => {}} />);
    await userEvent.type(
      screen.getByPlaceholderText("Pot name"),
      "Holiday Fund",
    );
    await userEvent.type(screen.getByPlaceholderText("Initial amount"), "0");
    await userEvent.press(screen.getByText("Create Pot"));
    expect(
      screen.getByText("Amount must be a positive number"),
    ).toBeOnTheScreen();
  });

  it("submits valid form data and closes the modal", async () => {
    const onCloseMock = jest.fn();
    await render(<AddPotModal onClose={onCloseMock} />);
    await userEvent.type(
      screen.getByPlaceholderText("Pot name"),
      "Holiday Fund",
    );
    await userEvent.type(screen.getByPlaceholderText("Initial amount"), "5000");
    await userEvent.press(screen.getByText("Create Pot"));
    expect(usePotsStore().addPot).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Holiday Fund",
        balance: 5000,
      }),
    );
    expect(onCloseMock).toHaveBeenCalled();
  });
});
