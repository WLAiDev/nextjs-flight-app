// step 1

import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/ValidateCustomerForm.module.css";

export default function ValidateCustomerForm() {
  const [customerNumber, setCustomerNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCustomerNumber: setCtxCustomerNumber } = useRegistration();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Stub API validation
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!customerNumber.trim() || customerNumber.length < 5) {
        throw new Error("Please enter a valid customer number.");
      }
      
      // Always succeed as stub
      setCtxCustomerNumber(customerNumber.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>Customer Number</label>
      <input
        className={styles.input}
        type="text"
        value={customerNumber}
        onChange={(e) => setCustomerNumber(e.target.value)}
        required
        minLength={5}
        autoFocus
      />
      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Validating..." : "Validate"}
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}