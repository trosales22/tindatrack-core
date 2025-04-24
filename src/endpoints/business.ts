import axios from 'axios';

interface BusinessListParams {
    q?: string;
    page?: number;
    limit?: number;
}

export const getBusinessList = (params: BusinessListParams) => axios.get('/api/v1/core/businesses', {
    params: params
});

export const getBusinessById = (businessId: string | undefined) => axios.get(`/api/v1/core/businesses/${businessId}`);

export const createBusiness = (payload: any) => axios.post('/api/v1/core/businesses', payload);

export const updateBusiness = (businessId: string | undefined, payload: any) => axios.put(`/api/v1/core/businesses/${businessId}`, payload);

export const deleteBusiness = (businessId: string | undefined) => axios.delete(`/api/v1/core/businesses/${businessId}`);
