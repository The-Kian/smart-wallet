import { render, screen } from "@testing-library/react-native";
import { View } from "react-native";
import TabLayout from "./_layout";

jest.mock("expo-router", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Tabs: Object.assign(
      ({ children }: any) => <View testID="mock-tabs">{children}</View>,
      { Screen: () => <View testID="mock-tab-screen" /> }
    ),
  };
});

describe("TabLayout", () => {
  it("renders Tabs with correct screens", async () => {
    await render(<TabLayout />);
    expect(screen.getByTestId("mock-tabs")).toBeTruthy();
    expect(screen.getAllByTestId("mock-tab-screen")).toHaveLength(4);
  });
});
