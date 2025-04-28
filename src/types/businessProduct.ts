import { UseQueryOptions } from '@tanstack/react-query';

export type BusinessIdParams = string | null | undefined;
export type ProductIdParams = string | null | undefined;

export interface BusinessProductPayload {
    name: string;
    category?: string;
    unit_price?: number;
    cost_price?: number;
    status?: string;
}


export type BusinessProductListParams = {
    params?: {
        q?: string,
        page?: number,
        limit?: number
    };
    businessId?: string;
    queryOptions?: UseQueryOptions;
  };
  
export type BusinessProductShowParams = {
    businessId?: string | null;
    productId?: string | null;
    queryOptions?: UseQueryOptions;
};