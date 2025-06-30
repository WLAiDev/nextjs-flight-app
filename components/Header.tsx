import Link from "next/link";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoCircle}>●</span>
        <span className={styles.logoText}>RedAir</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/steps/3">Flights</Link>
        <Link href="/steps/4">Passengers</Link>
        <Link href="/steps/5">Contact</Link>
      </nav>
      <div className={styles.search}>
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
}