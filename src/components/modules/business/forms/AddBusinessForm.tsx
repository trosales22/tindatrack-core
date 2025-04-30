import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button } from 'components/ui/components';
import { businessSchema, BusinessFormData } from 'schemas/businessSchema';
import { useCreateBusinessMutation } from 'hooks/business';
import { useQueryClient } from '@tanstack/react-query';
import { statusTypeOptions, storeTypeOptions } from 'utils/businessData';
import { useToast } from 'context/ToastContext';

interface AddBusinessFormProps {
  onClose: () => void;
}

const AddBusinessForm: FC<AddBusinessFormProps> = ({ onClose }) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
  });

  const { mutate: createBusiness, isPending: isCreateBusinessLoading } = useCreateBusinessMutation({
    onSuccess: () => {
      addToast({
        message: 'Added business successfully.',
        type: 'success',
      });

      queryClient.invalidateQueries({ queryKey: ['BUSINESS_LIST'] });
      onClose();
      reset();
    },
    onError: () => {},
  });

  const onSubmit = (data: BusinessFormData) => {
    createBusiness(data);
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
        <Button variant="primary" type="submit" disabled={isCreateBusinessLoading}>
          {isCreateBusinessLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default AddBusinessForm;
