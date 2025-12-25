"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useTeam } from "@/app/context/TeamContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { search, setSearch, searchTeam, resetTeam } = useTeam();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <nav className={styles.navBar}>
          <h1 className={styles.title}>
            Sports<span>Hub</span>
          </h1>

          <div className={styles.busca}>
              
            <input
              type="text"
              placeholder="Digite o time"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchTeam()}
              className={styles.searchInput}
            />
            <button className={styles.searchIcon} onClick={searchTeam}>🔍</button>
          </div>
        </nav>
      </div>

      <div className={styles.subMenu}>
        <ul className={styles.subMenuList}>
          <Link href="/" onClick={resetTeam}>
            <li className={`${styles.subItem}`}>Home</li>
          </Link>
          <Link href="/#news">
            <li className={styles.subItem}>Notícias</li>
          </Link>        </ul>
      </div>

      {showBackToTop && (
        <Link href="/" className={styles.backToTop}>
          ↑
        </Link>
      )}
    </>
  );
}