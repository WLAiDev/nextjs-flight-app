import React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RegistrationProvider } from "@/context/RegistrationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RegistrationProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </RegistrationProvider>
      </body>
    </html>
  );
}