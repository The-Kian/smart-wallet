import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

describe("Sanity", () => {
  it("works", () => {
    const result = render(<Text>Hello World</Text>);
    console.log(Object.keys(result));
    console.log("Screen keys:", Object.keys(screen));
  });
});
