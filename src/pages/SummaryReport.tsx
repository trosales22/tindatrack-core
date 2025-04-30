import { ChartCard, StatCard } from 'components/ui/components';
import Layout from 'components/layout/Layout';
import {
  transformStatsStats,
  transformProductCountPerBusiness,
  transformProductCategoryCountPerBusiness,
} from 'transformers/transformer';
import {
  useDashboardTotalsQuery,
  useDashboardSalesStatsQuery,
  useDashboardProductCountPerBusinessQuery,
  useDashboardProductCategoryCountPerBusinessQuery,
} from 'hooks/dashboard';
import { ROLES } from 'constants/roles';
import { useAuthData } from 'hooks/useAuthData';

const SummaryReportPage = () => {
  const { role: userRole } = useAuthData();
  const { data: totalsRes }: any = useDashboardTotalsQuery({});
  const { data: salesStatsRes }: any = useDashboardSalesStatsQuery({});
  const { data: productCountPerBusinessRes }: any = useDashboardProductCountPerBusinessQuery({});
  const { data: productCategoryCountPerBusinessRes }: any =
    useDashboardProductCategoryCountPerBusinessQuery({});

  const stats = [
    {
      label: 'Total Businesses',
      value: totalsRes?.data?.total_businesses || 0,
      color: 'text-orange-600',
      roles: [ROLES.BUSINESS_ADMIN],
    },
    {
      label: 'Total Products',
      value: totalsRes?.data?.total_products || 0,
      color: 'text-red-600',
      roles: [ROLES.BUSINESS_ADMIN],
    },
    {
      label: 'Total Sales',
      value: totalsRes?.data?.total_sales || 0,
      color: 'text-violet-600',
      roles: [ROLES.BUSINESS_ADMIN],
    },
  ];

  const filteredStats = stats.filter((stat) => stat.roles.includes(userRole));
  const salesStatsData = transformStatsStats(salesStatsRes?.data?.data || []);
  const productCountPerBusinessData = transformProductCountPerBusiness(
    productCountPerBusinessRes?.data?.data || [],
  );
  const productCategoryCountPerBusinessData = transformProductCategoryCountPerBusiness(
    productCategoryCountPerBusinessRes?.data?.data || [],
  );

  return (
    <Layout>
      <h1 className="text-xl sm:text-2xl font-semibold">Summary Report</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {filteredStats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} color={stat.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Sales" type="bar" data={salesStatsData} />
        <ChartCard title="Products" type="horizontalBar" data={productCountPerBusinessData} />
        <ChartCard
          title="Product Categories"
          type="horizontalBar"
          data={productCategoryCountPerBusinessData}
        />
      </div>
    </Layout>
  );
};

export default SummaryReportPage;
