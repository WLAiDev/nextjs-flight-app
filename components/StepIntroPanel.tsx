"use client";
import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/StepIntroPanel.module.css";

export default function StepIntroPanel() {
  const { goToNextStep } = useRegistration();

  return (
    <div className={styles.panel}>
      <h3>Registration Steps</h3>
      <p>
        Your customer number has been validated. Please proceed to provide your registration details. The steps are:
      </p>
      <ol>
        <li>Enter flight details (date and flight number)</li>
        <li>Enter passenger details (name and title)</li>
        <li>Enter your contact information</li>
        <li>Review and confirm your registration</li>
      </ol>
      <button 
        className={styles.button}
        onClick={() => {
          goToNextStep();
        }}
      >
        Continue to Flight Details
      </button>
    </div>
  );
}