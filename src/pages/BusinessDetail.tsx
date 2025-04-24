import React, { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Store,
  Edit,
  Trash2,
} from "lucide-react";
import { Tabs } from "components/ui/components";
import LayoutWithFooter from "components/LayoutWithFooter";

const BusinessDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const business = {
        id,
        name: "Sari-Sari Store",
        type: "Retail",
        owner: "Juan Dela Cruz",
        status: "Active",
        createdAt: "2024-05-01",
        salesToday: 1250,
        totalInventoryItems: 38,
        totalInvestments: 5000,
        profitLossThisMonth: 950,
    };

    const BDDashboardSection = lazy(() => import('components/modules/business-detail/tabs/BDDashboardSection'));
    const BDSalesHistorySection = lazy(() => import('components/modules/business-detail/tabs/BDSalesHistorySection'));
    const BDProductSection = lazy(() => import('components/modules/business-detail/tabs/BDProductSection'));

    const tabData = [
        {
          label: 'Dashboard',
          content: (
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <BDDashboardSection businessId={id} />
            </Suspense>
          ),
        },
        {
            label: 'Products',
            content: (
              <Suspense fallback={<div>Loading Products...</div>}>
                <BDProductSection businessId={id} />
              </Suspense>
            ),
        },
        {
          label: 'Sales History',
          content: (
            <Suspense fallback={<div>Loading Sales History...</div>}>
              <BDSalesHistorySection businessId={id} />
            </Suspense>
          ),
        },
        {
          label: 'Inventory',
          content: (
            <Suspense fallback={<div>Loading Inventory...</div>}>
              Test
            </Suspense>
          ),
        },
        {
            label: 'Investments',
            content: (
              <Suspense fallback={<div>Loading Investments...</div>}>
                Test
              </Suspense>
            ),
          },
    ];

    return (
        <LayoutWithFooter>
            <div className="container px-3 sm:px-6 mx-auto">
                <Link to="/" className="text-sm text-primary flex items-center gap-1 mb-4 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to Businesses
                </Link>

                <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                <div className="bg-primary text-white p-4 rounded-full shadow-lg">
                    <Store className="w-10 h-10" />
                </div>
                <div className="text-center sm:text-left flex flex-col sm:flex-row sm:justify-between w-full items-center sm:items-start">
                    <div>
                    <h1 className="text-2xl font-bold">{business.name}</h1>
                    <p className="text-sm text-neutral-content mt-1">Type: {business.type}</p>
                    <p className="text-sm text-neutral-content">Owner: {business.owner}</p>
                    <p className="text-sm text-neutral-content">Status: {business.status}</p>
                    <p className="text-sm text-neutral-content">Started on: {business.createdAt}</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center sm:justify-start mt-6">
                    <button className="text-primary hover:text-primary-focus cursor-pointer">
                        <Edit className="w-5 h-5" />
                        <span className="sr-only">Edit</span>
                    </button>
                    <button className="text-error hover:text-error-focus cursor-pointer">
                        <Trash2 className="w-5 h-5" />
                        <span className="sr-only">Delete</span>
                    </button>
                    </div>
                </div>

                <div className="mt-5">
                    <Tabs tabs={tabData} defaultIndex={0} withBorder={true} />
                </div>
            </div>
        </LayoutWithFooter>
    );
};

export default BusinessDetailPage;
