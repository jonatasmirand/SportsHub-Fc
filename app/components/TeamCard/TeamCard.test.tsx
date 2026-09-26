import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Team } from "@/app/types/team";
import TeamCard from "./TeamCard";

const team: Team = {
  strTeam: "Flamengo",
  strBadge: "https://r2.thesportsdb.com/flamengo.png",
  strCountry: "Brazil",
  strLeague: "Brazilian Serie A",
  strStadium: "Maracanã",
  strDescriptionEN: "Clube de Regatas do Flamengo",
};

describe("TeamCard", () => {
  it("exibe o escudo e os dados do time", () => {
    render(<TeamCard team={team} />);

    expect(
      screen.getByRole("heading", { name: "Flamengo", level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText("País: Brazil")).toBeInTheDocument();
    expect(screen.getByText("Liga: Brazilian Serie A")).toBeInTheDocument();
    expect(screen.getByText("Estádio: Maracanã")).toBeInTheDocument();

    const badge = screen.getByAltText("Flamengo");
    expect(badge).toBeInTheDocument();
    expect(badge.getAttribute("src")).toContain(
      encodeURIComponent(team.strBadge)
    );
  });
});
