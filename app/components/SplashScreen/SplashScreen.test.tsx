import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SplashScreen from "./SplashScreen";

describe("SplashScreen", () => {
  it("mostra o nome da marca ao montar", () => {
    render(<SplashScreen />);

    expect(
      screen.getByRole("heading", { name: "SportsHub FC" })
    ).toBeInTheDocument();
  });

  it("some após a animação de saída", async () => {
    render(<SplashScreen />);

    await waitForElementToBeRemoved(() => screen.queryByText("SportsHub FC"), {
      timeout: 10000,
    });
  }, 15000);
});
