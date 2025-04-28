import axios from 'axios';
import { BusinessListParams, BusinessPayload } from 'types/business';
import { BusinessIdParams, BusinessProductPayload, ProductIdParams } from 'types/businessProduct';

export const getBusinessList = (params: BusinessListParams) => axios.get('/api/v1/core/businesses', {
    params: params
});

export const getBusinessById = (businessId: BusinessIdParams) => axios.get(`/api/v1/core/businesses/${businessId}`);

export const createBusiness = (payload: BusinessPayload) => axios.post('/api/v1/core/businesses', payload);

export const updateBusiness = (businessId: BusinessIdParams, payload: BusinessPayload) => axios.put(`/api/v1/core/businesses/${businessId}`, payload);

export const deleteBusiness = (businessId: BusinessIdParams) => axios.delete(`/api/v1/core/businesses/${businessId}`);

//products
export const getBusinessProductList = (businessId: BusinessIdParams, params: BusinessListParams) => axios.get(`/api/v1/core/businesses/${businessId}/products`, {
    params: params
});

export const getBusinessProductById = (businessId: BusinessIdParams, productId: ProductIdParams) => axios.get(`/api/v1/core/businesses/${businessId}/products/${productId}`);

export const createBusinessProduct = (businessId: BusinessIdParams, payload: BusinessProductPayload) => axios.post(`/api/v1/core/businesses/${businessId}/products`, payload);

export const updateBusinessProduct = (businessId: BusinessIdParams, productId: ProductIdParams, payload: BusinessProductPayload) => axios.put(`/api/v1/core/businesses/${businessId}/products/${productId}`, payload);

export const deleteBusinessProduct = (businessId: BusinessIdParams, productId: ProductIdParams) => axios.delete(`/api/v1/core/businesses/${businessId}/products/${productId}`);