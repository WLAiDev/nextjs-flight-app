"use client";
import ConfirmationPanel from "@/components/ConfirmationPanel";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step6Page() {
  const { customerNumber, step, contact } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    if (!customerNumber) router.replace("/");
    if (step !== 6) router.replace(`/steps/${step}`);
    if (!contact.email || !contact.phone) router.replace("/steps/5");
  }, [step, customerNumber, contact, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <ConfirmationPanel />
      </div>
      <PanelBox>
        <ul>
          <li>Review your information before confirming</li>
        </ul>
      </PanelBox>
    </div>
  );
}