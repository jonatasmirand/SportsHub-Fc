import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import { TeamProvider } from "./context/TeamContext";
import styles from "./Home.module.css"


export const metadata: Metadata = {
  title: "SportsHub FC",
  description: "Aqui você encontra as principais informações do seu time do coração",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={styles.page}>
        <SplashScreen />
        <TeamProvider>
        <Header />
        <main >
        {children}
        </main>
        <Footer />
        </TeamProvider>
      </body>
    </html>
  );
}
