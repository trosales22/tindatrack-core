import { useState } from "react";
import Table from "components/ui/Table";
import Input from "components/ui/Input";
import Pagination from "components/ui/Pagination";
import { debounce } from "lodash";
import Wrapper from "components/Wrapper";
import Button from "components/ui/Button";
import { useListBusinessSalesQuery } from "hooks/business-sales";
import { formatCurrency } from "utils";
import { Pencil } from "lucide-react";
import { useSalesStore } from "stores/useSalesStore";
import Modal from "components/ui/Modal";
import AddBusinessSalesForm from "../forms/AddBusinessSalesForm";

interface SalesHistorySectionProps {
    businessId: string | undefined;
}

const BDSalesHistorySection: React.FC<SalesHistorySectionProps> = ({ businessId }) => {
    const { openCreateBusinessSales, setOpenCreateBusinessSales } = useSalesStore()
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, 300);

    const { data: response, isLoading, isError }: any = useListBusinessSalesQuery({
        businessId,
        params: { q: search, page: currentPage, limit: itemsPerPage }
    });
    const list = response?.data?.data || []; 
    const totalItems = response?.data?.meta?.pagination?.total || 0; 
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
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
                    <Button variant="primary" className="px-4 py-2" onClick={() => setOpenCreateBusinessSales(true)}>+ Add Sales</Button>
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
                    headers={["Date/Time", "Product", "Cost Price", "Quantity", "Total Amount", "Customer Name", "Notes/Remarks", "Actions"]}
                    headerColor="bg-[#0B1F3A]"
                    borderColor="border-gray-300"
                    bordered
                    rounded
                    className="bg-white"
                >
                    {list.map((item: any) => {
                        return (
                        <tr key={item.id}>
                            <td className="font-medium">{item?.attributes?.created_at}</td>
                            <td className="font-medium">{item?.attributes?.product?.name} <b>({item?.attributes?.product?.category?.label})</b></td>
                            <td className="font-medium">{formatCurrency(item?.attributes?.cost_price || 0)}</td>
                            <td className="font-medium">{item?.attributes?.quantity || 0}</td>
                            <td className="font-medium">{formatCurrency(item?.attributes?.total_amount || 0)}</td>
                            <td className="font-medium">{item?.attributes?.customer_name}</td>
                            <td className="font-medium">{item?.attributes?.remarks}</td>
                            <td>
                                <Button
                                    variant="ghost"
                                    className="btn-sm text-orange-500 hover:bg-orange-100"
                                    tooltip="Edit"
                                >
                                    <Pencil className="w-4 h-4" />
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
                id="add-business-sales-modal"
                title="Add Sales"
                closeOnBackdrop
                isOpen={openCreateBusinessSales}
                size="lg"
                onClose={() => setOpenCreateBusinessSales(false)}
                headerColor="blue"
            >
            {openCreateBusinessSales && (
                <AddBusinessSalesForm 
                    businessId={businessId}
                    onClose={() => setOpenCreateBusinessSales(false)} 
                />
            )}
            </Modal>
        </Wrapper>
    );
};

export default BDSalesHistorySection;
