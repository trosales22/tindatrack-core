import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from 'components/ui/components';
import { useShowBusinessProductByIdQuery } from 'hooks/business-product';

type ManageProductInventoryFormProps = {
    businessId?: string;
    productId?: string | null;
    onClose: () => void
};

const ManageProductInventoryForm: React.FC<ManageProductInventoryFormProps> = ({ businessId, productId, onClose}) => {
    const { data: response }: any = useShowBusinessProductByIdQuery({businessId, productId})
    const detail = response?.data?.data?.attributes || null
    const [stock, setStock] = useState<number>(0);

    useEffect(() => {
        setStock(detail?.inventory?.stock || 0);
    }, [detail])

    const increment = () => setStock((prev) => prev + 1);
    const decrement = () => setStock((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative stock

    const handleSave = () => {
        onClose();
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

        <div className="flex items-center justify-center gap-6 mb-6">
            <Button variant="outline" onClick={decrement}>
            <Minus className="w-5 h-5" />
            </Button>

            <div className="text-2xl font-bold w-16 text-center">{stock}</div>

            <Button variant="outline" onClick={increment}>
            <Plus className="w-5 h-5" />
            </Button>
        </div>

        <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
            Cancel
            </Button>
            <Button onClick={handleSave}>
            Save Changes
            </Button>
        </div>
        </>
    );
};

export default ManageProductInventoryForm;
