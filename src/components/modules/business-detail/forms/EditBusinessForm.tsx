import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button } from 'components/ui/components';
import { businessSchema, BusinessFormData } from 'schemas/businessSchema';
import { useUpdateBusinessMutation } from 'hooks/business';
import { useQueryClient } from '@tanstack/react-query';
import { statusTypeOptions, storeTypeOptions } from 'utils/businessData';
import { useToast } from 'context/ToastContext';
import { BusinessDetailAttributes } from 'types/business';

interface EditBusinessFormProps {
  businessId?: string;
  businessDetail: BusinessDetailAttributes;
  onClose: () => void;
}

const EditBusinessForm: FC<EditBusinessFormProps> = ({ businessId, businessDetail, onClose }) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  useEffect(() => {
    setValue('name', businessDetail?.name);
    setValue('type', businessDetail?.type?.code);
    setValue('status', businessDetail?.status?.code);
  }, [businessDetail]);

  const { mutate: updateBusiness, isPending: isUpdateBusinessLoading } = useUpdateBusinessMutation({
    onSuccess: () => {
      addToast({
        message: 'Update business successfully.',
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['BUSINESS_LIST'] });
      queryClient.invalidateQueries({ queryKey: ['BUSINESS_SHOW', businessId] });
      onClose();
      reset();
    },
    onError: () => {},
  });

  const onSubmit = (data: BusinessFormData) => {
    updateBusiness({
      businessId,
      payload: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2 p-3 bg-white rounded-lg sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
    >
      <Input
        label="Business Name"
        type="text"
        placeholder="Enter business name"
        error={errors?.name?.message}
        {...register('name')}
      />

      <Select
        {...register('type')}
        legend="Type"
        helperColor={errors.type ? 'text-red-500' : 'text-black'}
        defaultValue=""
        options={storeTypeOptions}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <Select
        {...register('status')}
        legend="Status"
        helperColor={errors.status ? 'text-red-500' : 'text-black'}
        defaultValue=""
        options={statusTypeOptions}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <div className="col-span-full flex justify-end mt-5">
        <Button variant="primary" type="submit" disabled={isUpdateBusinessLoading}>
          {isUpdateBusinessLoading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};

export default EditBusinessForm;
