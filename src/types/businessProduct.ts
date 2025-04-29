import { UseQueryOptions } from '@tanstack/react-query';

export type IdParams = string | null | undefined;

export interface BusinessProductPayload {
    name: string;
    category?: string;
    unit_price?: number;
    cost_price?: number;
    status?: string;
}

export interface ProductInventoryPayload {
    quantity?: number;
}

export interface CreateBusinessSalesPayload {
    product_id: string;
    quantity?: number;
    customer_name?: string;
    remarks?: string;
}

export interface UpdateBusinessSalesPayload {
    customer_name?: string;
    remarks?: string;
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

export type BusinessSalesShowParams = {
    businessId?: string | null;
    salesId?: string | null;
    queryOptions?: UseQueryOptions;
};