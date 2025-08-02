import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.tsx";

describe("App", () => {
  it("should render the h1 element with 'Hello World'", () => {
    const { getByText } = render(<App />);

    expect(getByText("Hello World")).toBeInTheDocument();
  });
});
