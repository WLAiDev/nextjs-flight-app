import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/PassengerDetailsForm.module.css";

type PassengerRow = { title: string; firstName: string; lastName: string; error?: string };

export default function PassengerDetailsForm() {
  const { setPassengers, goToNextStep, passengers } = useRegistration();
  const [rows, setRows] = useState<PassengerRow[]>(
    passengers.length
      ? passengers
      : [{ title: "", firstName: "", lastName: "" }]
  );
  const [loading, setLoading] = useState(false);

  function updateRow(idx: number, key: keyof PassengerRow, value: string) {
    setRows(rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  }

  function addRow() {
    setRows([...rows, { title: "", firstName: "", lastName: "" }]);
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    let hasError = false;
    const newRows = rows.map((r) => {
      if (!r.title || !r.firstName.trim() || !r.lastName.trim()) {
        hasError = true;
        return { ...r, error: "All fields required" };
      }
      return { ...r, error: undefined };
    });
    setRows(newRows);
    setLoading(false);
    if (!hasError) {
      setPassengers(newRows.map(({ title, firstName, lastName }) => ({ title, firstName, lastName })));
      goToNextStep();
    }
  }

  return (
    <div>
      <h2>Passenger Details</h2>
      <div className={styles.rows}>
        {rows.map((row, i) => (
          <div key={i} className={styles.row}>
            <select
              className={styles.select}
              value={row.title}
              onChange={(e) => updateRow(i, "title", e.target.value)}
              required
            >
              <option value="">Title</option>
              <option value="Ms">Ms</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
              <option value="Mx">Mx</option>
            </select>
            <input
              className={styles.input}
              type="text"
              placeholder="First Name"
              value={row.firstName}
              onChange={(e) => updateRow(i, "firstName", e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Last Name"
              value={row.lastName}
              onChange={(e) => updateRow(i, "lastName", e.target.value)}
              required
            />
            {row.error && <span className={styles.error}>{row.error}</span>}
          </div>
        ))}
      </div>
      <button className={styles.button} type="button" onClick={addRow}>
        Add Passenger
      </button>
      <button className={styles.button} type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Validating..." : "Continue"}
      </button>
    </div>
  );
}
