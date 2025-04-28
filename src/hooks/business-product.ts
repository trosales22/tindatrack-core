import { useMutation, useQuery, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import * as fns from 'endpoints/business';
import { BusinessProductListParams, BusinessProductShowParams } from 'types/businessProduct';
import { removeEmpty } from 'utils';

export const useListBusinessProductQuery = ({ params, businessId, queryOptions }: BusinessProductListParams) => {
  return useQuery({
    queryKey: ['BUSINESS_PRODUCT_LIST', businessId, removeEmpty(params)],
    queryFn: () => fns.getBusinessProductList(businessId, removeEmpty(params)),
    retry: false,
    ...queryOptions
  });
};

export const useShowBusinessProductByIdQuery = ({businessId, productId, queryOptions}: BusinessProductShowParams) => {
  return useQuery({
    queryKey: ['BUSINESS_PRODUCT_SHOW', businessId, productId],
    queryFn: () => fns.getBusinessProductById(businessId, productId),
    retry: false,
    ...queryOptions
  });
};

export const useCreateBusinessProductMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_PRODUCT_CREATE'],
    mutationFn: ({ businessId, payload}) => fns.createBusinessProduct(businessId, payload),
    ...mutationOptions
  });
};

export const useUpdateBusinessProductMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, string, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_PRODUCT_UPDATE'],
    mutationFn: ({ businessId, productId, payload }) =>
      fns.updateBusinessProduct(businessId, productId, payload),
    ...mutationOptions
  });
};

export const useDeleteBusinessProductMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_PRODUCT_DELETE'],
    mutationFn: ({ businessId, productId }) => fns.deleteBusinessProduct(businessId, productId),
    ...mutationOptions
  });
};