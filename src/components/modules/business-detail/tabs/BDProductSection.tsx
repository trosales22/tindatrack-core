import { useState } from "react";
import Table from "components/ui/Table";
import Input from "components/ui/Input";
import Pagination from "components/ui/Pagination";
import { debounce } from "lodash";
import Wrapper from "components/Wrapper";
import Button from "components/ui/Button";
import { useDeleteBusinessProductMutation, useListBusinessProductQuery } from "hooks/business-product";
import { formatCurrency } from "utils";
import { Package, Pencil, Trash } from "lucide-react";
import Modal from "components/ui/Modal";
import AddBusinessProductForm from "../forms/AddBusinessProductForm";
import { useProductStore } from "stores/useProductStore";
import EditBusinessProductForm from "../forms/EditBusinessProductForm";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "context/ToastContext";
import ManageProductInventoryForm from "../forms/ManageProductInventoryForm";

interface ProductSectionProps {
    businessId?: string;
}

const BDProductSection: React.FC<ProductSectionProps> = ({ businessId }) => {
    const { addToast } = useToast();
    const queryClient = useQueryClient()
    const { 
        openCreateBusinessProduct, 
        setOpenCreateBusinessProduct,
        openEditBusinessProduct,
        openDeleteBusinessProduct,
        setOpenEditBusinessProduct,
        setOpenDeleteBusinessProduct,
        selectedProductId,
        setSelectedProductId,
        openManageProductInventory,
        setOpenManageProductInventory
    } = useProductStore()
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }, 300);

    const { data: response, isLoading, isError }: any = useListBusinessProductQuery({
        businessId,
        params: { q: search, page: currentPage, limit: itemsPerPage }
    });
    const list = response?.data?.data || []; 
    const totalItems = response?.data?.meta?.pagination?.total || 0; 
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const { mutate: deleteProduct, isPending: isDeleteProductLoading } = useDeleteBusinessProductMutation({
        onSuccess: () => {
            addToast({
                message: 'Deleted product successfully.',
                type: 'success'
            });
            queryClient.invalidateQueries({ queryKey: ['BUSINESS_PRODUCT_LIST', businessId] });
            setOpenDeleteBusinessProduct(false);
            setSelectedProductId(null)
        },
        onError: () => {}
    });
    
    const onEditProductHandler = (productId?: string | null) => {
        setSelectedProductId(productId)
        setOpenEditBusinessProduct(true)
    }

    const onManageProductInventoryHandler = (productId?: string | null) => {
        setSelectedProductId(productId)
        setOpenManageProductInventory(true)
    }

    const onShowDeleteProductConfirmation = (productId?: string | null) => {
        setSelectedProductId(productId)
        setOpenDeleteBusinessProduct(true)
    }

    const onDeleteProductHandler = () => {
        deleteProduct({
            businessId,
            productId: selectedProductId
        })
    }
    
    return (
        <Wrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                <Input
                    type="text"
                    placeholder="Search.."
                    onChange={handleSearchChange}
                    className="w-full sm:w-[300px] md:w-[400px]"
                />

                <div className="flex sm:justify-end">
                    <Button 
                        variant="primary" 
                        className="px-4 py-2"
                        onClick={() => setOpenCreateBusinessProduct(true)}
                    >+ Add Product</Button>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            {isError && (
                <div role="alert" className="toast toast-top toast-end">
                    <div className="alert alert-error">
                    <span>Something went wrong. Please try again.</span>
                    </div>
                </div>
            )}

            {!isLoading && !isError && (
                <>
                <Table
                    headers={["Product Name", "Category", "Unit Price", "Cost Price", "Status", "Date Created", "Actions"]}
                    headerColor="bg-[#0B1F3A]"
                    borderColor="border-gray-300"
                    bordered
                    rounded
                    className="bg-white"
                >
                    {list.map((item: any) => {
                        return (
                        <tr key={item.id}>
                           <td className="font-medium">{item?.attributes?.name || 'N/A'}</td>
                            <td className="font-medium">{item?.attributes?.category?.label}</td>
                            <td className="font-medium">{formatCurrency(item?.attributes?.unit_price || 0.0)}</td>
                            <td className="font-medium">{formatCurrency(item?.attributes?.cost_price || 0.0)}</td>
                            <td className="font-medium">{item?.attributes?.status?.label}</td>
                            <td className="font-medium">{item?.attributes?.created_at}</td>
                            <td>
                                <Button
                                    variant="ghost"
                                    className="btn-sm text-orange-500 hover:bg-orange-100"
                                    tooltip="Edit"
                                    onClick={() => onEditProductHandler(item.id)}
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="btn-sm text-blue-500 hover:bg-blue-100"
                                    tooltip="Manage Inventory"
                                    onClick={() => onManageProductInventoryHandler(item.id)}
                                >
                                    <Package className="w-4 h-4" />
                                </Button>
                                
                                <Button
                                    variant="ghost"
                                    className="btn-sm text-red-500 hover:bg-red-100"
                                    tooltip="Delete"
                                    onClick={() => onShowDeleteProductConfirmation(item.id)}
                                >
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </td>
                        </tr>)
                    })}
                </Table>

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    size="sm"
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                />
                </>
            )}

            <Modal
                id="add-product-modal"
                title="Add Product"
                closeButton
                closeOnBackdrop
                isOpen={openCreateBusinessProduct}
                size="md"
                onClose={() => setOpenCreateBusinessProduct(false)}
                headerColor="blue"
            >
            {openCreateBusinessProduct && (
                <AddBusinessProductForm 
                    businessId={businessId}
                    onClose={() => setOpenCreateBusinessProduct(false)} 
                />
            )}
            </Modal>

            <Modal
                id="edit-product-modal"
                title="Edit Product"
                closeButton
                closeOnBackdrop
                isOpen={openEditBusinessProduct}
                size="md"
                onClose={() => setOpenEditBusinessProduct(false)}
                headerColor="blue"
            >
            {openEditBusinessProduct && (
                <EditBusinessProductForm 
                    businessId={businessId}
                    productId={selectedProductId}
                    onClose={() => setOpenEditBusinessProduct(false)} 
                />
            )}
            </Modal>

            <Modal
                id="manage-inventory-modal"
                title="Manage Inventory"
                closeButton
                closeOnBackdrop
                isOpen={openManageProductInventory}
                size="md"
                onClose={() => setOpenManageProductInventory(false)}
                headerColor="blue"
            >
            {openManageProductInventory && (
                <ManageProductInventoryForm 
                    businessId={businessId}
                    productId={selectedProductId}
                    onClose={() => setOpenManageProductInventory(false)} 
                />
            )}
            </Modal>

            <Modal
                id="delete-product-modal"
                title="Confirm Deletion"
                isOpen={openDeleteBusinessProduct}
                onClose={() => setOpenDeleteBusinessProduct(false)}
                headerColor="red"
            >
                {openDeleteBusinessProduct && (
                    <>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="ghost" onClick={() => setOpenDeleteBusinessProduct(false)}>No</Button>
                        <Button 
                            variant="danger" 
                            className="text-white" 
                            onClick={onDeleteProductHandler}
                            disabled={isDeleteProductLoading}
                        >{isDeleteProductLoading ? 'Deleting..' : 'Yes'}</Button>
                    </div>
                    </>
                )}
            </Modal>
        </Wrapper>
    );
};

export default BDProductSection;
