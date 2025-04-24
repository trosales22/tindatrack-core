import { useState } from "react";
import Table from "components/ui/Table";
import Input from "components/ui/Input";
import Pagination from "components/ui/Pagination";
import { debounce } from "lodash";
import Wrapper from "components/Wrapper";
import Button from "components/ui/Button";

interface SalesHistorySectionProps {
    businessId: string | undefined;
}

const BDSalesHistorySection: React.FC<SalesHistorySectionProps> = ({ businessId }) => {
    console.log(businessId) 
    
    const [search, setSearch] = useState("");
    console.log(search)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, 300);

    const isLoading = false
    const isError= false
    const response: any = []
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
                    <Button variant="primary" className="px-4 py-2">+ Add Sales</Button>
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
                    headers={["Ref #", "Date/Time", "Item Sold", "Quantity", "Unit Price", "Total Amount", "Customer Name", "Notes/Remarks"]}
                    headerColor="bg-[#0B1F3A]"
                    borderColor="border-gray-300"
                    bordered
                    rounded
                    className="bg-white"
                >
                    {list.map((item: any) => {
                        return (
                        <tr key={item.id}>
                           <td className="font-medium">{item?.attributes?.refno || 'N/A'}</td>
                            <td className="font-medium">
                                {`${item?.attributes?.vehicle?.label}`} <code>({item?.attributes?.vehicle?.plate_number})</code>
                            </td>
                            <td className="font-medium">{item?.attributes?.entry_time || 'N/A'}</td>
                            <td className="font-medium">{item?.attributes?.exit_time || 'N/A'}</td>
                            <td className="font-medium">{`${item?.attributes?.recorded_by?.firstname} ${item?.attributes?.recorded_by?.lastname}`}</td>
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
        </Wrapper>
    );
};

export default BDSalesHistorySection;
