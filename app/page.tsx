// Entry: Validate Customer
"use client";
import ValidateCustomerForm from "@/components/ValidateCustomerForm";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";

export default function HomePage() {
  const { step } = useRegistration();
  // If not step 1, redirect (should only render if at step 1)
  if (step !== 1) {
    if (typeof window !== "undefined") {
      window.location.href = `/steps/${step}`;
    }
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <h2>Welcome!</h2>
        <p>
          Please validate your customer number to begin the registration process.
        </p>
        <ValidateCustomerForm />
      </div>
      <PanelBox>
        <p>
          <b>Why register?</b>
          <br />
          Registration is required to continue.
        </p>
      </PanelBox>
    </div>
  );
}