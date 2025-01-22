import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
