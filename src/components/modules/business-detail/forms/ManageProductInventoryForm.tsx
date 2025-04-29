import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from 'components/ui/components';
import { useManageProductInventoryMutation, useShowBusinessProductByIdQuery } from 'hooks/business-product';
import { useToast } from 'context/ToastContext';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

type ManageProductInventoryFormProps = {
    businessId?: string;
    productId?: string | null;
    onClose: () => void
};

const ManageProductInventoryForm: React.FC<ManageProductInventoryFormProps> = ({ businessId, productId, onClose}) => {
    const queryClient = useQueryClient()
    const { addToast } = useToast()
    const { data: response }: any = useShowBusinessProductByIdQuery({businessId, productId})
    const detail = response?.data?.data?.attributes || null
    const [stock, setStock] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('0');
    const { handleSubmit, reset } = useForm();

    const { mutate: manageProductInventory, isPending: isManageProductInventoryLoading } = useManageProductInventoryMutation({
        onSuccess: (res) => {
            addToast({
                message: res?.data?.message,
                type: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['BUSINESS_PRODUCT_LIST', businessId] });
            onClose();
            reset();
        },
        onError: () => {}
    });

    useEffect(() => {
        const currentStock = detail?.inventory?.stock || 0;
        setStock(currentStock);
        setInputValue(String(currentStock));
    }, [detail])

    const increment = () => {
        const newValue = stock + 1;
        setStock(newValue);
        setInputValue(String(newValue));
    };

    const decrement = () => {
        const newValue = stock > 0 ? stock - 1 : 0;
        setStock(newValue);
        setInputValue(String(newValue));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (/^\d*$/.test(raw)) {
            setInputValue(raw);
            setStock(raw === '' ? 0 : parseInt(raw, 10));
        }
    };

    const onSubmit = () => {
        manageProductInventory({
            businessId,
            productId,
            payload: {
                quantity: stock
            }
        })
    };

    return (
        <>
        <div className="mb-6 space-y-1">
            <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Product:</span> {detail?.name}
            </p>
            <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Category:</span> {detail?.category?.label}
            </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center gap-6 mb-6">
                <Button type='button' variant="outline" onClick={decrement}>
                    <Minus className="w-5 h-5" />
                </Button>

                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-20 text-center border rounded-lg py-1 text-2xl font-bold"
                />

                <Button type="button" variant="outline" onClick={increment}>
                    <Plus className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={isManageProductInventoryLoading}>{isManageProductInventoryLoading ? 'Saving..' : 'Save Changes'}</Button>
            </div>
        </form>
        </>
    );
};

export default ManageProductInventoryForm;
