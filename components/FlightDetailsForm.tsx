import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/FlightDetailsForm.module.css";

type FlightRow = { date: string; flightNo: string; error?: string };

export default function FlightDetailsForm() {
  const { setFlightDetails, goToNextStep, flightDetails } = useRegistration();
  const [rows, setRows] = useState<FlightRow[]>(
    flightDetails.length
      ? flightDetails
      : [{ date: "", flightNo: "" }]
  );
  const [loading, setLoading] = useState(false);

  function addRow() {
    if (rows.length < 4) {
      setRows([...rows, { date: "", flightNo: "" }]);
    }
  }

  function updateRow(idx: number, key: "date" | "flightNo", value: string) {
    setRows(rows.map((r, i) => (i === idx ? { ...r, [key]: value } : r)));
  }

  async function handleValidate() {
    setLoading(true);
    // Simulate API validation
    await new Promise((r) => setTimeout(r, 400));
    let hasError = false;
    const newRows = rows.map((r) => {
      if (!r.date || !r.flightNo) {
        hasError = true;
        return { ...r, error: "All fields required" };
      }
      // stub: flightNo must be 3-6 chars, date must be YYYY-MM-DD
      if (!/^[A-Z0-9]{3,6}$/.test(r.flightNo)) {
        hasError = true;
        return { ...r, error: "Flight number invalid" };
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) {
        hasError = true;
        return { ...r, error: "Date invalid" };
      }
      return { ...r, error: undefined };
    });
    setRows(newRows);
    setLoading(false);
    if (!hasError) {
      setFlightDetails(newRows.map(({ date, flightNo }) => ({ date, flightNo })));
      goToNextStep();
    }
  }

  return (
    <div>
      <h2>Flight Details</h2>
      <p>Enter your flights. You may add up to 4 flights.</p>
      <div className={styles.rows}>
        {rows.map((row, i) => (
          <div key={i} className={styles.row}>
            <input
              className={styles.input}
              type="date"
              value={row.date}
              onChange={(e) => updateRow(i, "date", e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Flight No"
              value={row.flightNo}
              maxLength={6}
              onChange={(e) => updateRow(i, "flightNo", e.target.value.toUpperCase())}
              required
            />
            {i === rows.length - 1 && rows.length < 4 && (
              <button
                type="button"
                className={styles.addBtn}
                onClick={addRow}
                aria-label="Add flight row"
              >
                +
              </button>
            )}
            {row.error && <span className={styles.error}>{row.error}</span>}
          </div>
        ))}
      </div>
      <button type="button" onClick={handleValidate} disabled={loading}>
        {loading ? "Validating..." : "Continue"}
      </button>
    </div>
  );
}
