import styles from "@/styles/PanelBox.module.css";
import React from "react";
export default function PanelBox({ children }: { children: React.ReactNode }) {
  return <aside className={styles.panel}>{children}</aside>;
}