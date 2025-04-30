import { useState } from 'react';
import {
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react";
import { useModalStore } from 'stores/useModalStore';
import { Button, Modal } from 'components/ui/components';
import EditBusinessForm from './modules/business-detail/forms/EditBusinessForm';
import { useDeleteBusinessMutation } from 'hooks/business';
import { useToast } from 'context/ToastContext';
import { useQueryClient } from '@tanstack/react-query';
import { BusinessDetailAttributes } from 'types/business';
import { useNavigate } from 'react-router-dom';

type BusinessCardProps = {
  businessId?: string;
  businessDetail: BusinessDetailAttributes;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ businessId, businessDetail }) => {
  const { addToast } = useToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => setIsOpen(!isOpen);

  const { openEditBusiness, openDeleteBusiness, setOpenEditBusiness, setOpenDeleteBusiness } = useModalStore()

  const { mutate: deleteBusiness, isPending: isDeleteBusinessLoading } = useDeleteBusinessMutation({
    onSuccess: () => {
      addToast({
        message: 'Deleted business successfully.',
        type: 'success'
      });
      queryClient.invalidateQueries({ queryKey: ['BUSINESS_LIST'] });
      setOpenDeleteBusiness(false)
      navigate('/')
    },
    onError: () => {}
  });

  const onDeleteBusinessHandler = () => {
    deleteBusiness(businessId)
  }

  return (
    <>
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold cursor-pointer flex items-center gap-2" onClick={toggleAccordion}>
          {businessDetail?.name}
          <ChevronDown
            className={`w-5 h-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          />
        </h1>
        <div className="flex gap-3">
          <button className="text-primary hover:text-primary-focus cursor-pointer" onClick={() => setOpenEditBusiness(true)}>
            <Edit className="w-5 h-5" />
            <span className="sr-only">Edit</span>
          </button>
          <button className="text-error hover:text-error-focus cursor-pointer" onClick={() => setOpenDeleteBusiness(true)}>
            <Trash2 className="w-5 h-5" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <p className="text-sm sm:text-sm text-gray-800">Type: {businessDetail?.type?.label}</p>
          <p className="text-sm sm:text-sm text-gray-800">Owner: {`${businessDetail?.owner?.firstname} ${businessDetail?.owner?.lastname}`}</p>
          <p className="text-sm sm:text-sm text-gray-800">Status: {businessDetail?.status?.label}</p>
          <p className="text-sm sm:text-sm text-gray-800">Created on: {businessDetail?.created_at}</p>
        </div>
      )}
    </div>

    <Modal
      id="edit-business-modal"
      title="Edit Business"
      closeOnBackdrop
      isOpen={openEditBusiness}
      size="sm"
      onClose={() => setOpenEditBusiness(false)}
      headerColor="blue"
    >
      {openEditBusiness && (
        <EditBusinessForm 
          businessId={businessId}
          businessDetail={businessDetail}
          onClose={() => setOpenEditBusiness(false)} 
        />
      )}
    </Modal>

    <Modal
      id="delete-business-modal"
      title="Confirm Deletion"
      isOpen={openDeleteBusiness}
      onClose={() => setOpenDeleteBusiness(false)}
      headerColor="red"
    >
      {openDeleteBusiness && (
          <>
          <p>Are you sure you want to delete this business?</p>
          <div className="flex justify-end space-x-2 mt-4">
              <Button variant="ghost" onClick={() => setOpenDeleteBusiness(false)}>No</Button>
              <Button 
                  variant="danger" 
                  className="text-white" 
                  onClick={onDeleteBusinessHandler}
                  disabled={isDeleteBusinessLoading}
              >{isDeleteBusinessLoading ? 'Deleting..' : 'Yes'}</Button>
          </div>
          </>
      )}
    </Modal>
    </>
  );
};

export default BusinessCard;
