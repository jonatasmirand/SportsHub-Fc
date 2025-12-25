"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/app/services/news";
import { NewsArticle } from "@/app/types/newsArticle";
import { useTeam } from "./context/TeamContext";

import TeamCard from "./components/TeamCard/TeamCard";
import Destaques from "./components/Destaques/Destaques";
import News from "./components/News/News";
import styles from "./Home.module.css";

export default function Home() {
  const { team } = useTeam();

  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const data = team?.strTeam
          ? await getNews(team.strTeam)
          : await getNews();

        setAllNews(data);
      } catch (error) {
        console.error("Erro ao buscar notícias", error);
        setAllNews([]);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [team]);

  // 🔥 Destaques = 3 primeiras
  const destaques = allNews.slice(0, 3);

  // 🔥 Últimas = tudo menos os destaques
  const ultimasNoticias = allNews.filter(
    (article) =>
      !destaques.some((highlight) => highlight.url === article.url)
  );

  return (
    <div className={styles.container}>
      <div className={styles.teamSection}>
        {team ? (
          <TeamCard team={team} />
        ) : (
          <p className={styles.empty}>
            Todas as notícias do mundo da bola e do seu time do coração estão aqui!
          </p>
        )}
      </div>

      <Destaques news={destaques} />

      <News
        news={ultimasNoticias}
        loading={loading}
      />
    </div>
  );
}