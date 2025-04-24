import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  FileText,
  ShoppingCart,
  DollarSign,
  Store,
} from "lucide-react";
import Layout from "components/Layout";

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

  return (
    <Layout>
        <div className="container px-3 sm:px-6 mx-auto">
            <Link to="/" className="text-sm text-primary flex items-center gap-1 mb-4 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Businesses
            </Link>

            <div className="bg-white dark:bg-base-200 shadow-md rounded-2xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                <div className="bg-primary text-white p-4 rounded-full shadow-lg">
                <Store className="w-10 h-10" />
                </div>
                <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{business.name}</h1>
                <p className="text-sm text-neutral-content mt-1">Type: {business.type}</p>
                <p className="text-sm text-neutral-content">Owner: {business.owner}</p>
                <p className="text-sm text-neutral-content">Status: {business.status}</p>
                <p className="text-sm text-neutral-content">Started on: {business.createdAt}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <ShoppingCart className="text-primary w-6 h-6" />
                    <div>
                    <p className="font-semibold">Sales Today</p>
                    <p className="text-sm text-neutral-content">₱{business.salesToday.toLocaleString()}</p>
                    </div>
                </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <FileText className="text-info w-6 h-6" />
                    <div>
                    <p className="font-semibold">Inventory Items</p>
                    <p className="text-sm text-neutral-content">{business.totalInventoryItems} items</p>
                    </div>
                </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <DollarSign className="text-success w-6 h-6" />
                    <div>
                    <p className="font-semibold">Total Investments</p>
                    <p className="text-sm text-neutral-content">₱{business.totalInvestments.toLocaleString()}</p>
                    </div>
                </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <BarChart2 className="text-warning w-6 h-6" />
                    <div>
                    <p className="font-semibold">Profit/Loss (This Month)</p>
                    <p className="text-sm text-neutral-content">₱{business.profitLossThisMonth.toLocaleString()}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default BusinessDetailPage;
