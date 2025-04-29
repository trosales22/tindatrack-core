import { useMutation, useQuery, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import * as fns from 'endpoints/business';
import { BusinessProductListParams, BusinessSalesShowParams } from 'types/businessProduct';
import { removeEmpty } from 'utils';

export const useListBusinessSalesQuery = ({ params, businessId, queryOptions }: BusinessProductListParams) => {
  return useQuery({
    queryKey: ['BUSINESS_SALES_LIST', businessId, removeEmpty(params)],
    queryFn: () => fns.getBusinessSalesList(businessId, removeEmpty(params)),
    retry: false,
    ...queryOptions
  });
};

export const useShowBusinessSalesByIdQuery = ({businessId, salesId, queryOptions}: BusinessSalesShowParams) => {
  return useQuery({
    queryKey: ['BUSINESS_SALES_SHOW', businessId, salesId],
    queryFn: () => fns.getBusinessSalesById(businessId, salesId),
    retry: false,
    ...queryOptions
  });
};

export const useCreateBusinessSalesMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_SALES_CREATE'],
    mutationFn: ({ businessId, payload }) => fns.createBusinessSales(businessId, payload),
    ...mutationOptions
  });
};

export const useUpdateBusinessSalesMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, string, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_SALES_UPDATE'],
    mutationFn: ({ businessId, salesId, payload }) =>
      fns.updateBusinessSales(businessId, salesId, payload),
    ...mutationOptions
  });
};