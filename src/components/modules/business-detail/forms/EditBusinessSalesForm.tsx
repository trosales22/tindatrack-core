import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from 'components/ui/components';
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "context/ToastContext";
import { useShowBusinessSalesByIdQuery, useUpdateBusinessSalesMutation } from "hooks/business-sales";
import { BusinessSalesFormData, businessSalesSchema } from "schemas/businessSaleSchema";

interface EditBusinessSalesFormProps {
    businessId?: string;
    salesId?: string | null;
    onClose: () => void;
}

const EditBusinessSalesForm: FC<EditBusinessSalesFormProps> = ({ businessId, salesId, onClose }) => {
    const queryClient = useQueryClient();
    const { addToast } = useToast();

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<BusinessSalesFormData>({
        resolver: zodResolver(businessSalesSchema),
    });

    const { data: response }: any = useShowBusinessSalesByIdQuery({
        businessId,
        salesId
    })
    const salesDetail = response?.data?.data?.attributes || null

    useEffect(() => {
        setValue('customer_name', salesDetail?.customer_name)
        setValue('remarks', salesDetail?.remarks)
    }, [salesId, salesDetail])

    const { mutate: updateBusinessSales, isPending: isUpdateBusinessSalesLoading } = useUpdateBusinessSalesMutation({
        onSuccess: () => {
            addToast({
                message: 'Successfully updated sale item.',
                type: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['BUSINESS_SALES_LIST', businessId] });
            onClose();
            reset();
        },
        onError: () => {}
    });

    const onSubmit = (data: BusinessSalesFormData) => {
        updateBusinessSales({
            businessId,
            salesId,
            payload: data
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-2 p-3 bg-white rounded-lg sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
        >    
            <Input
                label="Customer Name"
                type="text"
                placeholder="Enter customer name"
                error={errors?.customer_name?.message}
                {...register("customer_name")}
            />

            <Input
                label="Remarks"
                type="text"
                placeholder="Enter remarks"
                error={errors?.remarks?.message}
                {...register("remarks")}
            />

            <div className="col-span-full flex justify-end mt-5">
                <Button variant="primary" type="submit" disabled={isUpdateBusinessSalesLoading}>
                {isUpdateBusinessSalesLoading ? "Updating..." : "Update"}
                </Button>
            </div>
        </form>
    );
};

export default EditBusinessSalesForm;
