import React, { lazy, Suspense, useState } from "react";
import { Building2, BarChart3, Settings } from "lucide-react"
import { Dock } from "components/ui/components";
import Header from "components/Header";

const BusinessSection = lazy(() => import("components/modules/BusinessSection"));
const SummaryReportSection = lazy(() => import("components/modules/SummaryReportSection"));
const SettingsSection = lazy(() => import("components/modules/SettingsSection"));

const Homepage: React.FC = () => {
    const [activeSection, setActiveSection] = useState("businesses");

    const handleDockClick = (section: string) => {
        setActiveSection(section);
    };

    const renderSection = () => {
        switch (activeSection) {
            case "summary-report":
                return <SummaryReportSection />;
            case "settings":
                return <SettingsSection />;
            default:
                return <BusinessSection />;
        }
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
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-1 mt-20 p-4">
                <Suspense fallback={<div>Loading...</div>}>
                    {renderSection()}
                </Suspense>

                <Dock buttons={buttons} className="mt-8" />
            </div>
        </div>
  );
};

export default Homepage;
