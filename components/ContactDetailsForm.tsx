import { useState } from "react";
import { useRegistration } from "@/context/RegistrationContext";
import styles from "@/styles/ContactDetailsForm.module.css";

// Basic phone codes
const countryCodes = [
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+34", country: "Spain" },
  { code: "+39", country: "Italy" },
  // Add more as needed
];

export default function ContactDetailsForm() {
  const { setContact, goToNextStep, contact } = useRegistration();
  const [form, setForm] = useState({
    email: contact.email || "",
    contactName: contact.contactName || "",
    countryCode: contact.countryCode || "+1",
    phone: contact.phone || "",
    error: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setForm((f) => ({ ...f, error: "Email invalid" }));
      setLoading(false);
      return;
    }
    if (!form.contactName) {
      setForm((f) => ({ ...f, error: "Contact name required" }));
      setLoading(false);
      return;
    }
    if (!form.phone || !/^[\d\s\-]{6,}$/.test(form.phone)) {
      setForm((f) => ({ ...f, error: "Phone invalid" }));
      setLoading(false);
      return;
    }
    setContact(form);
    goToNextStep();
    setLoading(false);
  }

  return (
    <div>
      <h2>Contact Details</h2>
      <div className={styles.formRow}>
        <label>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label>Contact Name</label>
        <input
          className={styles.input}
          type="text"
          name="contactName"
          value={form.contactName}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formRow}>
        <label>Phone</label>
        <select
          className={styles.select}
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
        >
          {countryCodes.map((cc) => (
            <option key={cc.code} value={cc.code}>{cc.code} ({cc.country})</option>
          ))}
        </select>
        <input
          className={styles.input}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone number"
        />
      </div>
      {form.error && <div className={styles.error}>{form.error}</div>}
      <button className={styles.button} type="button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}