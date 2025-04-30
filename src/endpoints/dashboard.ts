import axios from 'axios';
import { IdParams } from 'types/businessProduct';

interface DashboardParams {
  business_id?: IdParams;
}

export const getDashboardTotals = (params: DashboardParams) =>
  axios.get(`/api/v1/core/dashboard/statistics/totals`, { params });

export const getDashboardSalesStats = (params: DashboardParams) =>
  axios.get(`/api/v1/core/dashboard/analytics/sales_stats`, { params });

export const getDashboardProductCountPerBusiness = (params: DashboardParams) =>
  axios.get(`/api/v1/core/dashboard/analytics/product_count_per_business`, { params });

export const getDashboardProductCategoryCountPerBusiness = (params: DashboardParams) =>
  axios.get(`/api/v1/core/dashboard/analytics/product_category_count_per_business`, { params });
