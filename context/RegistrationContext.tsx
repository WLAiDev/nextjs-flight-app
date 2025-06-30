"use client";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type FlightDetail = { date: string; flightNo: string };
type Passenger = { title: string; firstName: string; lastName: string };
type Contact = {
  email: string;
  contactName: string;
  countryCode: string;
  phone: string;
};

type RegistrationContextType = {
  step: number;
  customerNumber: string;
  setCustomerNumber: (c: string) => void;
  goToNextStep: () => void;
  setStep: (n: number) => void;
  resetAll: () => void;
  flightDetails: FlightDetail[];
  setFlightDetails: (f: FlightDetail[]) => void;
  passengers: Passenger[];
  setPassengers: (p: Passenger[]) => void;
  contact: Contact;
  setContact: (c: Partial<Contact>) => void;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
  const [step, setStepState] = useState(1);
  const [customerNumber, setCustomerNumberState] = useState("");
  const [flightDetails, setFlightDetailsState] = useState<FlightDetail[]>([]);
  const [passengers, setPassengersState] = useState<Passenger[]>([]);
  const [contact, setContactState] = useState<Contact>({
    email: "",
    contactName: "",
    countryCode: "+1",
    phone: "",
  });

  const router = useRouter();

  function setStep(n: number) {
    setStepState(n);
    if (n === 1) {
      router.push("/");
    } else {
      router.push(`/steps/${n}`);
    }
  }

  function goToNextStep() {
    const nextStep = step + 1;
    setStepState(nextStep);
    router.push(`/steps/${nextStep}`);
  }

  function setCustomerNumberWithRedirect(number: string) {
    setCustomerNumberState(number);
    localStorage.setItem("customerNumber", number);
    // setStepState(2); // Set the step first
    router.push('/steps/2'); // Then redirect
  }

  function resetAll() {
    setStepState(1);
    setCustomerNumberState("");
    setFlightDetailsState([]);
    setPassengersState([]);
    setContactState({
      email: "",
      contactName: "",
      countryCode: "+1",
      phone: "",
    });
    router.push("/");
  }

  return (
    <RegistrationContext.Provider
      value={{
        step,
        customerNumber,
        setCustomerNumber: setCustomerNumberWithRedirect, // Use the new function
        goToNextStep,
        setStep,
        resetAll,
        flightDetails,
        setFlightDetails: setFlightDetailsState,
        passengers,
        setPassengers: setPassengersState,
        contact,
        setContact: (c: Partial<Contact>) =>
          setContactState((prev) => ({ ...prev, ...c })),
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("Must be used within RegistrationProvider");
  return ctx;
}