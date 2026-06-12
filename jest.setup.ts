jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock("@shopify/flash-list", () => {
  const React = require("react");
  const { FlatList } = require("react-native");

  const MockFlashList = React.forwardRef((props: any, ref: any) =>
    React.createElement(FlatList, { ...props, ref }),
  );

  return {
    FlashList: MockFlashList,
  };
});