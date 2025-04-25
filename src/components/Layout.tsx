import React from "react";
import Header from "./Header";
import Dock from "./ui/Dock";
import { Building2, BarChart3, Settings } from "lucide-react"
import { useDockNavigationStore } from "stores/useDockNavigationStore";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { setActiveSection } = useDockNavigationStore()

  const handleDockClick = (section: string) => {
    setActiveSection(section);
  };

  const buttons = [
    {
      label: "Businesses",
      icon: <Building2 className="w-6 h-6" />,
      onClick: () => handleDockClick("businesses")
    },
    {
      label: "Summary Report",
      icon: <BarChart3 className="w-6 h-6" />,
      onClick: () => handleDockClick("summary-report")
    },
    {
      label: "Settings",
      icon: <Settings className="w-6 h-6" />,
      onClick: () => handleDockClick("settings")
    }
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto pt-18 pb-20 p-4">
        {children}
      </main>

      <Dock 
        buttons={buttons} 
        className="fixed bottom-0 w-full z-50" 
      />
    </div>
  );
};

export default Layout;
