import axios from 'axios';
import { GeneralListParams, BusinessPayload } from 'types/business';
import {
  IdParams,
  BusinessProductPayload,
  CreateBusinessSalesPayload,
  ProductInventoryPayload,
  UpdateBusinessSalesPayload,
} from 'types/businessProduct';

export const getBusinessList = (params: GeneralListParams) =>
  axios.get('/api/v1/core/businesses', {
    params: params,
  });

export const getBusinessById = (businessId: IdParams) =>
  axios.get(`/api/v1/core/businesses/${businessId}`);

export const createBusiness = (payload: BusinessPayload) =>
  axios.post('/api/v1/core/businesses', payload);

export const updateBusiness = (businessId: IdParams, payload: BusinessPayload) =>
  axios.put(`/api/v1/core/businesses/${businessId}`, payload);

export const deleteBusiness = (businessId: IdParams) =>
  axios.delete(`/api/v1/core/businesses/${businessId}`);

//products
export const getBusinessProductList = (businessId: IdParams, params: GeneralListParams) =>
  axios.get(`/api/v1/core/businesses/${businessId}/products`, {
    params: params,
  });

export const getBusinessProductById = (businessId: IdParams, productId: IdParams) =>
  axios.get(`/api/v1/core/businesses/${businessId}/products/${productId}`);

export const createBusinessProduct = (businessId: IdParams, payload: BusinessProductPayload) =>
  axios.post(`/api/v1/core/businesses/${businessId}/products`, payload);

export const updateBusinessProduct = (
  businessId: IdParams,
  productId: IdParams,
  payload: BusinessProductPayload,
) => axios.put(`/api/v1/core/businesses/${businessId}/products/${productId}`, payload);

export const deleteBusinessProduct = (businessId: IdParams, productId: IdParams) =>
  axios.delete(`/api/v1/core/businesses/${businessId}/products/${productId}`);

//inventory
export const manageProductInventory = (
  businessId: IdParams,
  productId: IdParams,
  payload: ProductInventoryPayload,
) =>
  axios.post(
    `/api/v1/core/businesses/${businessId}/products/${productId}/inventory/manage`,
    payload,
  );

//sales
export const getBusinessSalesList = (businessId: IdParams, params: GeneralListParams) =>
  axios.get(`/api/v1/core/businesses/${businessId}/sales`, {
    params: params,
  });

export const getBusinessSalesById = (businessId: IdParams, salesId: IdParams) =>
  axios.get(`/api/v1/core/businesses/${businessId}/sales/${salesId}`);

export const createBusinessSales = (businessId: IdParams, payload: CreateBusinessSalesPayload[]) =>
  axios.post(`/api/v1/core/businesses/${businessId}/sales`, payload);

export const updateBusinessSales = (
  businessId: IdParams,
  salesId: IdParams,
  payload: UpdateBusinessSalesPayload,
) => axios.put(`/api/v1/core/businesses/${businessId}/sales/${salesId}`, payload);
