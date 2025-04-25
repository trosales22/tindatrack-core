import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutWithFooterProps {
  children: React.ReactNode;
}

const LayoutWithFooter = ({ children }: LayoutWithFooterProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto pt-18 pb-20 p-4">
      {children}
      </main>

      <Footer />
    </div>
  );
};

export default LayoutWithFooter;