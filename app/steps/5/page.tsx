"use client";
import ContactDetailsForm from "@/components/ContactDetailsForm";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step5Page() {
  const { customerNumber, step, passengers } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    if (!customerNumber) router.replace("/");
    if (step !== 5) router.replace(`/steps/${step}`);
    if (!passengers.length) router.replace("/steps/4");
  }, [step, customerNumber, passengers, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <ContactDetailsForm />
      </div>
      <PanelBox>
        <ul>
          <li>We will use your contact info only for this registration</li>
        </ul>
      </PanelBox>
    </div>
  );
}