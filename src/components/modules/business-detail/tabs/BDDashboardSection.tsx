import Wrapper from 'components/Wrapper';
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
import { IdParams } from 'types/businessProduct';
import { StatCard, ChartCard } from 'components/ui/components';

interface DashboardSectionProps {
  businessId?: IdParams;
}

const BDDashboardSection: React.FC<DashboardSectionProps> = ({ businessId }) => {
  const { data: totalsRes }: any = useDashboardTotalsQuery({});
  const { data: salesStatsRes }: any = useDashboardSalesStatsQuery({
    business_id: businessId,
  });
  const { data: productCountPerBusinessRes }: any = useDashboardProductCountPerBusinessQuery({
    business_id: businessId,
  });
  const { data: productCategoryCountPerBusinessRes }: any =
    useDashboardProductCategoryCountPerBusinessQuery({
      business_id: businessId,
    });

  const stats = [
    {
      label: 'Total Products',
      value: totalsRes?.data?.total_products || 0,
      color: 'text-red-600',
    },
    {
      label: 'Total Sales',
      value: totalsRes?.data?.total_sales || 0,
      color: 'text-violet-600',
    },
  ];

  const salesStatsData = transformStatsStats(salesStatsRes?.data?.data || []);
  const productCountPerBusinessData = transformProductCountPerBusiness(
    productCountPerBusinessRes?.data?.data || [],
  );
  const productCategoryCountPerBusinessData = transformProductCategoryCountPerBusiness(
    productCategoryCountPerBusinessRes?.data?.data || [],
  );

  return (
    <Wrapper>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} color={stat.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard title="Sales per Business" type="bar" data={salesStatsData} />
        <ChartCard
          title="Products per Business"
          type="horizontalBar"
          data={productCountPerBusinessData}
        />
        <ChartCard
          title="Product Categories per Business"
          type="horizontalBar"
          data={productCategoryCountPerBusinessData}
        />
      </div>
    </Wrapper>
  );
};

export default BDDashboardSection;
