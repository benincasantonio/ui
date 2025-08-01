import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button.tsx";

describe("Button", () => {
  it("should renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("should call method onClick", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call method onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    );
    const button = screen.getByRole("button", { name: /click me/i });

    button.click();

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should have correct type attribute", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("should forward ref correctly", () => {
    const ref = {
      current: null,
    };
    render(<Button ref={ref}>Click Me</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
