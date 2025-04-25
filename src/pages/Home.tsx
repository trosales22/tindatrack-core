import React, { lazy, Suspense } from "react";
import Layout from "components/Layout";
import { useDockNavigationStore } from "stores/useDockNavigationStore";

const BusinessSection = lazy(() => import("components/modules/BusinessSection"));
const SummaryReportSection = lazy(() => import("components/modules/SummaryReportSection"));
const SettingsSection = lazy(() => import("components/modules/SettingsSection"));

const Homepage: React.FC = () => {
    const { activeSection } = useDockNavigationStore()

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

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                {renderSection()}
            </Suspense>
        </Layout>
    );
};

export default Homepage;
