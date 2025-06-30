"use client";
import FlightDetailsForm from "@/components/FlightDetailsForm";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step3Page() {
  const { customerNumber, step } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    if (!customerNumber) router.replace("/");
    if (step !== 3) router.replace(`/steps/${step}`);
  }, [step, customerNumber, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <FlightDetailsForm />
      </div>
      <PanelBox>
        <ul>
          <li>Tip: Check your flight numbers</li>
        </ul>
      </PanelBox>
    </div>
  );
}