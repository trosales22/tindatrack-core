import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import * as fns from 'endpoints/business';
import { GeneralListParams } from 'types/business';
import { removeEmpty } from 'utils';

type BusinessListParams = {
  params?: GeneralListParams;
  queryOptions?: UseQueryOptions;
};

type BusinessShowParams = {
  businessId?: string;
  queryOptions?: UseQueryOptions;
};

export const useListBusinessQuery = ({ params, queryOptions }: BusinessListParams) => {
  return useQuery({
    queryKey: ['BUSINESS_LIST', removeEmpty(params)],
    queryFn: () => fns.getBusinessList(removeEmpty(params)),
    ...queryOptions
  });
};

export const useShowBusinessByIdQuery = ({businessId, queryOptions}: BusinessShowParams) => {
  return useQuery({
    queryKey: ['BUSINESS_SHOW', businessId],
    queryFn: () => fns.getBusinessById(businessId),
    ...queryOptions
  });
};

export const useCreateBusinessMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_CREATE'],
    mutationFn: (payload: any) => fns.createBusiness(payload),
    ...mutationOptions
  });
};

export const useUpdateBusinessMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, string, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_UPDATE'],
    mutationFn: ({ businessId, payload }) =>
      fns.updateBusiness(businessId, payload),
    ...mutationOptions
  });
};

export const useDeleteBusinessMutation = (mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>) => {
  return useMutation({
    mutationKey: ['BUSINESS_DELETE'],
    mutationFn: (businessId: string | undefined) => fns.deleteBusiness(businessId),
    ...mutationOptions
  });
};