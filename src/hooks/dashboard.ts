import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as fns from 'endpoints/dashboard';
import { IdParams } from 'types/businessProduct';
import { removeEmpty } from 'utils';

type DashboardParams = {
  business_id?: IdParams;
  queryOptions?: UseQueryOptions;
};

export const useDashboardTotalsQuery = ({
  business_id: businessId,
  queryOptions,
}: DashboardParams) => {
  return useQuery({
    queryKey: ['DASHBOARD_TOTALS', removeEmpty(businessId)],
    queryFn: () =>
      fns.getDashboardTotals(
        removeEmpty({
          business_id: businessId,
        }),
      ),
    retry: false,
    ...queryOptions,
  });
};

export const useDashboardSalesStatsQuery = ({
  business_id: businessId,
  queryOptions,
}: DashboardParams) => {
  return useQuery({
    queryKey: ['DASHBOARD_SALES_STATS', removeEmpty(businessId)],
    queryFn: () =>
      fns.getDashboardSalesStats(
        removeEmpty({
          business_id: businessId,
        }),
      ),
    retry: false,
    ...queryOptions,
  });
};

export const useDashboardProductCountPerBusinessQuery = ({
  business_id: businessId,
  queryOptions,
}: DashboardParams) => {
  return useQuery({
    queryKey: ['DASHBOARD_PRODUCT_COUNT_PER_BUSINESS', removeEmpty(businessId)],
    queryFn: () =>
      fns.getDashboardProductCountPerBusiness(
        removeEmpty({
          business_id: businessId,
        }),
      ),
    retry: false,
    ...queryOptions,
  });
};

export const useDashboardProductCategoryCountPerBusinessQuery = ({
  business_id: businessId,
  queryOptions,
}: DashboardParams) => {
  return useQuery({
    queryKey: ['DASHBOARD_PRODUCT_CATEGORY_COUNT_PER_BUSINESS', removeEmpty(businessId)],
    queryFn: () =>
      fns.getDashboardProductCategoryCountPerBusiness(
        removeEmpty({
          business_id: businessId,
        }),
      ),
    retry: false,
    ...queryOptions,
  });
};
