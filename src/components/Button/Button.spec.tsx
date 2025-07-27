import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
    it('should renders children correctly', () => {
        render(<button>Click Me</button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should call method onClick', () => {
        const handleClick = vi.fn();
        render(<button onClick={handleClick}>Click Me</button>);
        const button = screen.getByRole('button', { name: /click me/i });

        button.click();

        expect(handleClick).toHaveBeenCalledTimes(1);
    })

    it('should not call method onClick when disabled', () => {
        const handleClick = vi.fn();
        render(<button onClick={handleClick} disabled>Click Me</button>);
        const button = screen.getByRole('button', { name: /click me/i });

        button.click();

        expect(handleClick).not.toHaveBeenCalled();
    })

    it('should have correct type attribute', () => {
        render(<button type="submit">Submit</button>);
        const button = screen.getByRole('button', { name: /submit/i });

        expect(button).toHaveAttribute('type', 'submit');
    });

    it('should forward ref correctly', () => {
        const ref = {
            current: null
        }
        render(<button ref={ref}>Click Me</button>);


        expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
});