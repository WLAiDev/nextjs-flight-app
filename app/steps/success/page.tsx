"use client";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { resetAll } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    // Reset after showing for a while, user can restart
    const timeout = setTimeout(() => {
      resetAll();
      router.replace("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [resetAll, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <h2>Registration Complete!</h2>
        <p>Your registration has been successfully submitted.</p>
        <p>
          You will be redirected to the start page shortly. Thank you for registering.
        </p>
      </div>
      <PanelBox>
        <p>Success! You may close this window.</p>
      </PanelBox>
    </div>
  );
}