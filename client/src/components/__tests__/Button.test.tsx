import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Button from "../Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables button when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Loading...</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-transparent");
    expect(screen.getByRole("button").querySelector(".animate-spin")).toBeInTheDocument();
  });
});
