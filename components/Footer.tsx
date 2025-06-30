import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="#">Terms of Service</a> • <a href="#">Privacy Policy</a>
      </div>
      <div className={styles.info}>
        &copy; {new Date().getFullYear()} RedAir. All rights reserved.
      </div>
    </footer>
  );
}