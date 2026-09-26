import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TeamProvider } from "@/app/context/TeamContext";
import { getTeamByName } from "@/app/services/sportsdb";
import Header from "./Header";

vi.mock("@/app/services/sportsdb", () => ({
  getTeamByName: vi.fn(),
}));

const getTeamByNameMock = vi.mocked(getTeamByName);

function renderHeader() {
  return render(
    <TeamProvider>
      <Header />
    </TeamProvider>
  );
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  it("renderiza título, busca e navegação", () => {
    renderHeader();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "SportsHub"
    );
    expect(screen.getByPlaceholderText("Digite o time")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar time" })).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Notícias")).toBeInTheDocument();
  });

  it("busca o time ao clicar na lupa", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.type(screen.getByPlaceholderText("Digite o time"), "Flamengo");
    await user.click(screen.getByRole("button", { name: "Buscar time" }));

    expect(getTeamByNameMock).toHaveBeenCalledWith("Flamengo");
  });

  it("busca o time ao pressionar Enter", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.type(
      screen.getByPlaceholderText("Digite o time"),
      "Palmeiras{Enter}"
    );

    expect(getTeamByNameMock).toHaveBeenCalledWith("Palmeiras");
  });

  it("não busca quando o campo está vazio", async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole("button", { name: "Buscar time" }));

    expect(getTeamByNameMock).not.toHaveBeenCalled();
  });

  it("mostra o botão de voltar ao topo após rolar a página", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;

    renderHeader();

    expect(
      screen.queryByRole("button", { name: "Voltar ao topo" })
    ).not.toBeInTheDocument();

    window.scrollY = 400;
    window.dispatchEvent(new Event("scroll"));

    const backToTop = await screen.findByRole("button", {
      name: "Voltar ao topo",
    });
    await user.click(backToTop);

    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" })
    );
  });
});
