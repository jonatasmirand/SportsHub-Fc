// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NewsArticle } from "@/app/types/newsArticle";
import { GET } from "./route";

function article(title: string, description: string | null = null): NewsArticle {
  return {
    title,
    description,
    url: `https://exemplo.com/${encodeURIComponent(title)}`,
    urlToImage: null,
    source: { name: "Portal" },
  };
}

function mockFetch(articles: NewsArticle[], ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => ({ articles }),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.stubEnv("NEWS_API_KEY", "test-key");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("GET /api/news", () => {
  it("busca 'futebol' e limita a 15 artigos quando não há time", async () => {
    const articles = Array.from({ length: 20 }, (_, i) => article(`Notícia ${i}`));
    const fetchMock = mockFetch(articles);

    const response = await GET(new Request("http://localhost/api/news"));
    const body = await response.json();

    expect(fetchMock.mock.calls[0][0]).toContain("q=futebol");
    expect(fetchMock.mock.calls[0][0]).toContain("apiKey=test-key");
    expect(body).toHaveLength(15);
  });

  it("filtra por palavras-chave do time e limita a 18 artigos", async () => {
    const fetchMock = mockFetch([
      article("Flamengo vence no Maracanã"),
      article("Notícia genérica", "O flamengo clube segue líder"),
      article("Vôlei masculino estreia"),
    ]);

    const response = await GET(
      new Request("http://localhost/api/news?q=Flamengo")
    );
    const body: NewsArticle[] = await response.json();

    expect(fetchMock.mock.calls[0][0]).toContain("q=Flamengo");
    expect(body.map((item) => item.title)).toEqual([
      "Flamengo vence no Maracanã",
      "Notícia genérica",
    ]);
  });

  it("retorna 500 quando a API externa falha", async () => {
    mockFetch([], false);

    const response = await GET(new Request("http://localhost/api/news"));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Erro ao buscar notícias",
    });
  });

  it("retorna lista vazia quando a resposta não traz artigos", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );

    const response = await GET(new Request("http://localhost/api/news?q=Santos"));

    await expect(response.json()).resolves.toEqual([]);
  });
});
