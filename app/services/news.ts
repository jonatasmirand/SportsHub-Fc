export async function getNews(query?: string) {
  const res = await fetch(
    `/api/news${query ? `?q=${encodeURIComponent(query)}` : ""}`
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar notícias");
  }

  return res.json();
}