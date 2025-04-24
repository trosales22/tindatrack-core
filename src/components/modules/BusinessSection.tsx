import React, { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import { debounce } from "lodash";
import { useListBusinessQuery } from "hooks/business";
import { Business } from "types/business";
import Pagination from "components/ui/Pagination";
import Modal from "components/ui/Modal";
import { useModalStore } from "stores/useModalStore";
import AddBusinessForm from "./business/forms/AddBusinessForm";

const BusinessSection: React.FC = () => {
  const { openCreateBusiness, setOpenCreateBusiness } = useModalStore()
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const navigate = useNavigate();

  const handleSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }, 300);

  const { data: response, isLoading, isError }: any = useListBusinessQuery({
    params: { q: search, page: currentPage, limit: itemsPerPage }
  });

  const businesses: Business[] = response?.data?.data || [];
  const totalItems = response?.data?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Your Businesses</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
          <Input
            placeholder="Search business..."
            onChange={handleSearchChange}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Button
            variant="primary"
            className="px-4 py-2 whitespace-nowrap"
            onClick={() => setOpenCreateBusiness(true)}
          >
            + Add Business
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="text-center text-gray-500 py-10">Loading businesses...</div>
        )}

        {isError && (
          <div className="text-center text-red-500 py-10">
            Failed to load businesses. Please try again.
          </div>
        )}

        {!isLoading && !isError && businesses.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No businesses found.
          </div>
        )}

        {!isLoading && !isError &&
          businesses.map((business) => (
            <div
              key={business.id}
              className="w-full bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/businesses/${business.id}`)}
            >
              <div>
                <h2 className="text-lg font-medium text-base-content">
                  {business?.attributes?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {business?.attributes?.type?.label}
                </p>
              </div>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => navigate(`/businesses/${business.id}`)}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}

        {!isLoading && !isError && businesses.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            size="sm"
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>

      <Modal
        id="add-business-modal"
        title="Add Business"
        closeButton
        closeOnBackdrop
        isOpen={openCreateBusiness}
        size="sm"
        onClose={() => setOpenCreateBusiness(false)}
        headerColor="blue"
      >
        {openCreateBusiness && (
          <AddBusinessForm onClose={() => setOpenCreateBusiness(false)} />
        )}
      </Modal>
    </>
  );
};

export default BusinessSection;
