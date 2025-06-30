"use client";
import PassengerDetailsForm from "@/components/PassengerDetailsForm";
import PanelBox from "@/components/PanelBox";
import styles from "@/styles/Page.module.css";
import { useRegistration } from "@/context/RegistrationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Step4Page() {
  const { customerNumber, step, flightDetails } = useRegistration();
  const router = useRouter();

  useEffect(() => {
    if (!customerNumber) router.replace("/");
    if (step !== 4) router.replace(`/steps/${step}`);
    if (!flightDetails.length) router.replace("/steps/3");
  }, [step, customerNumber, flightDetails, router]);

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <PassengerDetailsForm />
      </div>
      <PanelBox>
        <ul>
          <li>All fields are required</li>
        </ul>
      </PanelBox>
    </div>
  );
}