import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Select, Button, CurrencyInput } from 'components/ui/components';
import { useQueryClient } from '@tanstack/react-query';
import { productCategoryOptions, statusTypeOptions } from 'utils/businessData';
import { BusinessProductFormData, businessProductSchema } from 'schemas/businessProductSchema';
import {
  useShowBusinessProductByIdQuery,
  useUpdateBusinessProductMutation,
} from 'hooks/business-product';
import { useToast } from 'context/ToastContext';

interface EditBusinessProductFormProps {
  businessId?: string;
  productId?: string | null;
  onClose: () => void;
}

const EditBusinessProductForm: FC<EditBusinessProductFormProps> = ({
  businessId,
  productId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const {
    setValue,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessProductFormData>({
    resolver: zodResolver(businessProductSchema),
  });

  const { data: response }: any = useShowBusinessProductByIdQuery({
    businessId,
    productId,
  });

  const productDetail = response?.data?.data?.attributes || null;

  useEffect(() => {
    setValue('name', productDetail?.name);
    setValue('category', productDetail?.category?.code);
    setValue('unit_price', productDetail?.unit_price);
    setValue('cost_price', productDetail?.cost_price);
    setValue('status', productDetail?.status?.code);
  }, [productDetail]);

  const { mutate: updateProduct, isPending: isUpdateProductLoading } =
    useUpdateBusinessProductMutation({
      onSuccess: () => {
        addToast({
          message: 'Successfully updated product.',
          type: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['BUSINESS_PRODUCT_LIST', businessId] });
        onClose();
        reset();
      },
      onError: () => {},
    });

  const onSubmit = (data: BusinessProductFormData) => {
    updateProduct({
      businessId,
      productId,
      payload: data,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-2 p-3 bg-white rounded-lg sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
    >
      <Input
        label="Product Name"
        type="text"
        placeholder="Enter product name"
        error={errors?.name?.message}
        {...register('name')}
      />

      <Select
        {...register('category')}
        legend="Category"
        helperColor={errors.category ? 'text-red-500' : 'text-black'}
        defaultValue=""
        options={productCategoryOptions}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <CurrencyInput
        label="Unit Price"
        placeholder="Enter unit price"
        error={errors?.unit_price?.message}
        {...register('unit_price')}
      />

      <CurrencyInput
        label="Cost Price"
        placeholder="Enter cost price"
        error={errors?.cost_price?.message}
        {...register('cost_price')}
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
        <Button variant="primary" type="submit" disabled={isUpdateProductLoading}>
          {isUpdateProductLoading ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};

export default EditBusinessProductForm;
