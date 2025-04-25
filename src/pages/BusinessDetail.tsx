import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  Edit,
  Trash2,
} from "lucide-react";
import { Breadcrumbs, Tabs } from "components/ui/components";
import { useShowBusinessByIdQuery } from "hooks/business";
import Layout from "components/layout/Layout";

const BusinessDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data: response }: any = useShowBusinessByIdQuery({
      businessId: id
    })
    const businessDetail = response?.data?.data?.attributes || null
    const breadcrumbItems = [
      { label: 'Businesses', href: '/' },
      { label: businessDetail?.name, href: `/businesses/${id}` }
    ];

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
        )
      },
      {
        label: 'Products',
        content: (
          <Suspense fallback={<div>Loading Products...</div>}>
            <BDProductSection businessId={id} />
          </Suspense>
        )
      },
      {
        label: 'Sales History',
        content: (
          <Suspense fallback={<div>Loading Sales History...</div>}>
            <BDSalesHistorySection businessId={id} />
          </Suspense>
        )
      },
      {
        label: 'Inventory',
        content: (
          <Suspense fallback={<div>Loading Inventory...</div>}>
            Test
          </Suspense>
        )
      },
      {
        label: 'Investments',
        content: (
          <Suspense fallback={<div>Loading Investments...</div>}>
            Test
          </Suspense>
        )
      }
    ];

    return (
      <Layout>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="text-left w-full">
              <h1 className="text-xl sm:text-2xl font-bold">{businessDetail?.name}</h1>
              <p className="text-sm sm:text-sm text-gray-800 mt-1">Type: {businessDetail?.type?.label}</p>
              <p className="text-sm sm:text-sm text-gray-800">Owner: {`${businessDetail?.owner?.firstname} ${businessDetail?.owner?.lastname}`}</p>
              <p className="text-sm sm:text-sm text-gray-800">Status: {businessDetail?.status?.label}</p>
              <p className="text-sm sm:text-sm text-gray-800">Created on: {businessDetail?.created_at}</p>
            </div>

            <div className="flex gap-3 justify-start mt-4 sm:mt-0 self-start">
              <button className="text-primary hover:text-primary-focus">
                <Edit className="w-5 h-5" />
                <span className="sr-only">Edit</span>
              </button>
              <button className="text-error hover:text-error-focus">
                <Trash2 className="w-5 h-5" />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Tabs tabs={tabData} defaultIndex={0} withBorder={true} />
        </div>
      </Layout>
    );
};

export default BusinessDetailPage;
