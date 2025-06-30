import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/ConfirmationPanel.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmationPanel() {
  const { flightDetails, passengers, contact, setStep, resetAll } = useRegistration();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function handleConfirm() {
    setLoading(true);
    setError(undefined);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));
    // Always succeed with 200 OK
    setLoading(false);
    router.push("/steps/success");
  }

  return (
    <div>
      <h2>Confirm Registration</h2>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <strong>Flights</strong>
          <button type="button" onClick={() => setStep(3)}>
            Edit
          </button>
        </div>
        <ul>
          {flightDetails.map((f, i) => (
            <li key={i}>
              {f.date} &mdash; {f.flightNo}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <strong>Passengers</strong>
          <button type="button" onClick={() => setStep(4)}>
            Edit
          </button>
        </div>
        <ul>
          {passengers.map((p, i) => (
            <li key={i}>
              {p.title} {p.firstName} {p.lastName}
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <strong>Contact</strong>
          <button type="button" onClick={() => setStep(5)}>
            Edit
          </button>
        </div>
        <div>
          <span>
            <b>Name:</b> {contact.contactName}
          </span>
          <br />
          <span>
            <b>Email:</b> {contact.email}
          </span>
          <br />
          <span>
            <b>Phone:</b> {contact.countryCode} {contact.phone}
          </span>
        </div>
      </section>
      {error && <div className={styles.error}>{error}</div>}
      <button type="button" onClick={handleConfirm} disabled={loading}>
        {loading ? "Submitting..." : "Confirm Registration"}
      </button>
      <button type="button" onClick={resetAll} style={{ marginLeft: 8 }}>
        Start Over
      </button>
    </div>
  );
}