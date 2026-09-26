import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewsArticle } from "@/app/types/newsArticle";
import { Team } from "@/app/types/team";
import { useTeam } from "@/app/context/TeamContext";
import News from "./News";

vi.mock("@/app/context/TeamContext", () => ({
  useTeam: vi.fn(),
}));

const useTeamMock = vi.mocked(useTeam);

const team: Team = {
  strTeam: "Santos",
  strBadge: "https://r2.thesportsdb.com/santos.png",
  strCountry: "Brazil",
  strLeague: "Brazilian Serie A",
  strStadium: "Vila Belmiro",
  strDescriptionEN: "Santos FC",
};

function mockTeam(value: Team | null) {
  useTeamMock.mockReturnValue({
    team: value,
    search: "",
    setSearch: vi.fn(),
    searchTeam: vi.fn(),
    resetTeam: vi.fn(),
  });
}

const articles: NewsArticle[] = [
  {
    title: "Santos vence clássico",
    description: "Vitória por 2 a 0",
    url: "https://exemplo.com/1",
    urlToImage: "https://exemplo.com/1.jpg",
    source: { name: "Exemplo FC" },
  },
  {
    title: "Novo técnico anunciado",
    description: null,
    url: "https://exemplo.com/2",
    urlToImage: null,
    source: { name: "Outro Portal" },
  },
];

describe("News", () => {
  it("lista as notícias recebidas", () => {
    mockTeam(null);
    render(<News news={articles} loading={false} />);

    expect(
      screen.getByRole("heading", { name: "Últimas notícias", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.getByRole("link", { name: /Santos vence clássico/ })
    ).toHaveAttribute("href", "https://exemplo.com/1");
    expect(screen.getByAltText("Santos vence clássico")).toBeInTheDocument();
    expect(screen.queryByAltText("Novo técnico anunciado")).not.toBeInTheDocument();
  });

  it("usa o nome do time no título quando há time selecionado", () => {
    mockTeam(team);
    render(<News news={articles} loading={false} />);

    expect(
      screen.getByRole("heading", { name: "Últimas notícias do Santos" })
    ).toBeInTheDocument();
  });

  it("mostra o estado de carregamento", () => {
    mockTeam(null);
    render(<News news={[]} loading />);

    expect(screen.getByText("Carregando notícias...")).toBeInTheDocument();
    expect(screen.queryByText("Nenhuma notícia encontrada.")).not.toBeInTheDocument();
  });

  it("mostra o estado vazio", () => {
    mockTeam(null);
    render(<News news={[]} loading={false} />);

    expect(screen.getByText("Nenhuma notícia encontrada.")).toBeInTheDocument();
  });
});
