import { NextResponse } from "next/server";
import { NewsArticle } from "@/app/types/newsArticle";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const team = searchParams.get("q"); // nome do time (opcional)

    // 🔹 Se não tiver time, busca futebol geral
    const query = team ? team : "futebol";

    const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
            query
        )}&language=pt&sortBy=publishedAt&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        return NextResponse.json(
            { error: "Erro ao buscar notícias" },
            { status: 500 }
        );
    }

    const data: { articles: NewsArticle[] } = await res.json();

    if (!team) {
        return NextResponse.json((data.articles ?? []).slice(0, 15));
    }

    const keywords = [
        team,
        `${team} FC`,
        `${team} futebol`,
        `${team} clube`,
    ].map((k) => k.toLowerCase());

    const filteredArticles = (data.articles ?? []).filter(
        (article: NewsArticle) => {
            const text = `${article.title} ${article.description ?? ""}`.toLowerCase();
            return keywords.some((word) => text.includes(word));
        }
    );
    return NextResponse.json(filteredArticles.slice(0, 18));
}