"use client";

import { useEffect, useState } from "react";
import { NewsArticle } from "@/app/types/newsArticle";
import styles from "./Destaques.module.css";

const AUTOPLAY_DELAY = 5000;

interface DestaquesProps {
    news: NewsArticle[];
}

export default function Destaques({ news }: DestaquesProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (news.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % news.length);
        }, AUTOPLAY_DELAY);

        return () => clearInterval(interval);
    }, [news]);

    if (news.length === 0) return null;

    const article = news[current];

    return (
        <section className={styles.destaques}>
            <div className={styles.carousel}>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                >
                    {article.urlToImage && (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className={styles.image}
                        />
                    )}

                    <div className={styles.overlay}>
                        <h3>{article.title}</h3>
                        <span>{article.source.name}</span>
                    </div>
                </a>

                <div className={styles.indicators}>
                    {news.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === current ? styles.active : ""
                                }`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}