import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
