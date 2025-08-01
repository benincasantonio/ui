import { describe, it, expect, vi } from "vitest";
import { Input } from "@/components/Input/Input.tsx";
import { render, screen } from "@testing-library/react";
import { userEvent } from "storybook/test";

describe("Input", () => {
  describe("Basic Rendering", () => {
    it("input element renders successfully", () => {
      render(<Input type="text" placeholder="Enter text here..." />);

      expect(
        screen.getByPlaceholderText("Enter text here..."),
      ).toBeInTheDocument();
    });

    it("input element renders with correct type", () => {
      render(<Input type="email" placeholder="Enter email here..." />);

      expect(
        screen.getByPlaceholderText("Enter email here..."),
      ).toHaveAttribute("type", "email");
    });

    it("accept and display typed text correctly", async () => {
      render(<Input type="text" placeholder="Type something..." />);

      const inputElement: HTMLInputElement =
        screen.getByPlaceholderText("Type something...");

      await userEvent.type(inputElement, "Hello, World!");

      expect(inputElement.value).toBe("Hello, World!");
    });
  });

  describe("User Interaction", () => {
    it("gain focus when clicked", async () => {
      render(<Input type="text" placeholder="Click to focus" />);

      const inputElement: HTMLInputElement =
        screen.getByPlaceholderText("Click to focus");

      await userEvent.click(inputElement);

      expect(document.activeElement).toBe(inputElement);
    });

    it("gain focus automatically when autoFocus is true", () => {
      render(<Input type="text" placeholder="Auto focus input" autoFocus />);

      const inputElement: HTMLInputElement =
        screen.getByPlaceholderText("Auto focus input");

      expect(document.activeElement).toBe(inputElement);
    });

    it("call onChange handler when text is typed", async () => {
      const handleChange = vi.fn();

      render(
        <Input
          type="text"
          placeholder="Type and check change"
          onChange={handleChange}
        />,
      );

      const inputElement: HTMLInputElement = screen.getByPlaceholderText(
        "Type and check change",
      );

      await userEvent.type(inputElement, "Test input");

      expect(handleChange).toHaveBeenCalledTimes("Test input".length);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: "Test input",
          }),
        }),
      );
    });
  });
});
