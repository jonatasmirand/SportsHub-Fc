import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NewsArticle } from "@/app/types/newsArticle";
import Destaques from "./Destaques";

const news: NewsArticle[] = [
  {
    title: "Primeiro destaque",
    description: null,
    url: "https://exemplo.com/1",
    urlToImage: "https://exemplo.com/1.jpg",
    source: { name: "Portal Um" },
  },
  {
    title: "Segundo destaque",
    description: null,
    url: "https://exemplo.com/2",
    urlToImage: "https://exemplo.com/2.jpg",
    source: { name: "Portal Dois" },
  },
];

afterEach(() => {
  vi.useRealTimers();
});

describe("Destaques", () => {
  it("não renderiza nada sem notícias", () => {
    const { container } = render(<Destaques news={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("mostra o primeiro destaque com imagem, fonte e link", () => {
    render(<Destaques news={news} />);

    expect(
      screen.getByRole("heading", { name: "Primeiro destaque", level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByText("Portal Um")).toBeInTheDocument();
    expect(screen.getByAltText("Primeiro destaque")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://exemplo.com/1"
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("troca de destaque ao clicar no indicador", async () => {
    const user = userEvent.setup();
    render(<Destaques news={news} />);

    await user.click(screen.getAllByRole("button")[1]);

    expect(
      screen.getByRole("heading", { name: "Segundo destaque" })
    ).toBeInTheDocument();
  });

  it("avança automaticamente a cada 5s", async () => {
    vi.useFakeTimers();
    render(<Destaques news={news} />);

    expect(screen.getByText("Primeiro destaque")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText("Segundo destaque")).toBeInTheDocument();
  });
});
