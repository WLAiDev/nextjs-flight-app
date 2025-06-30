"use client";
import StepIntroPanel from "@/components/StepIntroPanel";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step2Page() {
  const { customerNumber, step } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if there's no customer number
    if (!customerNumber) {
      router.replace("/");
    }
  }, [customerNumber, router]);

  // Remove the step check since we're already on step 2
  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <h2>Welcome to Registration</h2>
        <p>Customer Number: {customerNumber}</p>
        <StepIntroPanel />
      </div>
      <PanelBox>
        <ul>
          <li>Keep your information ready</li>
          <li>Flight details needed</li>
          <li>Passenger information</li>
          <li>Contact info</li>
          <li>Confirmation step</li>
        </ul>
      </PanelBox>
    </div>
  );
}