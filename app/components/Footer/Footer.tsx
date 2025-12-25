import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>
                    2025 - SportsHub, desenvolvido por <span className={styles.author}>Jonatas Miranda</span>
                </p>
            </div>
        </footer>
    );
}