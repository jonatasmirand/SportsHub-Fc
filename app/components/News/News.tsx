"use client";

import { NewsArticle } from "@/app/types/newsArticle";
import styles from "./News.module.css";
import { useTeam } from "@/app/context/TeamContext";

interface NewsProps {
    news: NewsArticle[];
    loading: boolean;
}

export default function News({ news, loading }: NewsProps) {
    const { team } = useTeam();

    return (
        <section id="news" className={styles.newsSection}>
            <h2 className={styles.title}>
                {team ? `Últimas notícias do ${team.strTeam}` : "Últimas notícias"}
            </h2>

            {loading && <p className={styles.loading}>Carregando notícias...</p>}

            {!loading && news.length === 0 && (
                <p className={styles.empty}>Nenhuma notícia encontrada.</p>
            )}

            <ul className={styles.newsCard}>
                {news.map((article) => (
                    <li key={article.url} className={styles.newsItem}>
                        {article.urlToImage && (
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className={styles.newsImage}
                            />
                        )}

                        <div className={styles.newsContent}>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.newsLink}
                            >
                                <h3 className={styles.newsTitle}>{article.title}</h3>
                                <p className={styles.newsSource}>{article.source.name}</p>
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}