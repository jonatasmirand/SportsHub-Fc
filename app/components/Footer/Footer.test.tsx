import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renderiza o rodapé com o autor", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText("Jonatas Miranda")).toBeInTheDocument();
    expect(screen.getByText(/2025 - SportsHub/)).toBeInTheDocument();
  });
});
