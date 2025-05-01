import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs, Tabs } from 'components/ui/components';
import { useShowBusinessByIdQuery } from 'hooks/business';
import Layout from 'components/layout/Layout';
import BusinessCard from 'components/BusinessCard';

const BusinessDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: response }: any = useShowBusinessByIdQuery({
    businessId: id,
  });
  const businessDetail = response?.data?.data?.attributes || null;
  const breadcrumbItems = [
    { label: 'Businesses', href: '/' },
    { label: businessDetail?.name, href: `/businesses/${id}` },
  ];

  const BDDashboardSection = lazy(
    () => import('components/modules/business-detail/tabs/BDDashboardSection'),
  );
  const BDProductSection = lazy(
    () => import('components/modules/business-detail/tabs/BDProductSection'),
  );
  const BDSalesHistorySection = lazy(
    () => import('components/modules/business-detail/tabs/BDSalesHistorySection'),
  );

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
  ];

  return (
    <Layout>
      <Breadcrumbs items={breadcrumbItems} />

      <BusinessCard businessId={id} businessDetail={businessDetail} />

      <div className="flex flex-col h-full">
        <Tabs tabs={tabData} defaultIndex={0} withBorder={false} />
      </div>
    </Layout>
  );
};

export default BusinessDetailPage;
