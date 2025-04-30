import { useQueryClient } from "@tanstack/react-query";
import { Input, Select, Button } from "components/ui/components";
import { useToast } from "context/ToastContext";
import { useListBusinessProductQuery } from "hooks/business-product";
import { useCreateBusinessSalesMutation } from "hooks/business-sales";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { SaleItem } from "types/business";
import { BusinessProduct } from "types/businessProduct";

interface AddBusinessSalesFormProps {
    businessId?: string;
    onClose: () => void;
}

const AddBusinessSalesForm: React.FC<AddBusinessSalesFormProps> = ({ businessId, onClose }) => {
    const queryClient = useQueryClient()
    const { addToast } = useToast()
    const { data: response }: any = useListBusinessProductQuery({
        businessId
    });
    const list: BusinessProduct[] = response?.data?.data || []; 

    const { mutate: createBusinessSales, isPending: isCreateBusinessSalesLoading } = useCreateBusinessSalesMutation({
        onSuccess: () => {
            addToast({
                message: 'Added items successfully.',
                type: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['BUSINESS_SALES_LIST', businessId] });
            onClose();
        },
        onError: () => {}
    });

    const [sales, setSales] = useState<SaleItem[]>([
        { product_id: "", quantity: 1, customer_name: "", remarks: "" },
    ]);
    
    const addItem = () => {
    setSales([...sales, { product_id: "", quantity: 1, customer_name: "", remarks: "" }]);
    };

    const updateItem = (index: number, field: keyof SaleItem, value: string | number) => {
    const updated = [...sales];
    
    if (field === "quantity") {
        updated[index][field] = Number(value);
    } else {
        updated[index][field] = String(value);
    }
    
    setSales(updated);
    };

    const removeItem = (index: number) => {
    const updatedSales = [...sales];
    updatedSales.splice(index, 1); // Removes the item at the specified index
    setSales(updatedSales);
    };

    const handleSubmit = () => {
    const payload = { sales };

    createBusinessSales({
        businessId,
        payload
    })
    };

    return (
    <div className="p-4 space-y-4">
        <div className="hidden md:grid grid-cols-4 gap-2 font-semibold text-sm text-gray-600 px-4">
            <div>Product</div>
            <div>Quantity</div>
            <div>Customer Name</div>
            <div>Remarks</div>
        </div>

        {sales.map((item, index) => (
            <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-4 gap-2 border p-4 rounded-lg shadow items-center"
            >
                <Select
                    className="w-full"
                    defaultValue={item.product_id}
                    onChange={(e) => updateItem(index, "product_id", e.target.value)}
                    options={list.map((item) => ({
                        value: item?.id,
                        label: item?.attributes?.name
                    }))}
                />

                <Input
                    type="number"
                    className="input input-bordered w-full"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                    placeholder="Quantity"
                />

                <Input
                    type="text"
                    className="input input-bordered w-full"
                    value={item.customer_name}
                    onChange={(e) => updateItem(index, "customer_name", e.target.value)}
                    placeholder="Customer Name"
                />

                <Input
                    type="text"
                    className="input input-bordered w-full"
                    value={item.remarks}
                    onChange={(e) => updateItem(index, "remarks", e.target.value)}
                    placeholder="Remarks"
                />

                <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full">
                    <Button
                        type="button"
                        className="btn btn-ghost btn-sm text-red-500 p-0"
                        onClick={() => removeItem(index)}
                    >
                        <Trash size={20} />
                    </Button>
                </div>
            </div>
        ))}

        <div className="flex flex-col md:flex-row gap-2 justify-end">
            <Button className="btn btn-outline btn-primary" onClick={addItem} disabled={isCreateBusinessSalesLoading}>
            + Add Item
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={isCreateBusinessSalesLoading}>
            {isCreateBusinessSalesLoading ? 'Submitting' : 'Submit'}
            </Button>
        </div>
    </div>
    );
}

export default AddBusinessSalesForm;