import { useState } from 'react';
import {
    ChevronDown,
    Edit,
    Trash2,
} from "lucide-react";

type BusinessDetail = {
    name: string;
    type: {
        label: string;
    };
    owner: {
        firstname: string;
        lastname: string;
    };
    status: {
        label: string;
    };
    created_at: string;
};

type BusinessCardProps = {
    businessDetail: BusinessDetail;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ businessDetail }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold cursor-pointer flex items-center gap-2" onClick={toggleAccordion}>
          {businessDetail?.name}
          <ChevronDown
            className={`w-5 h-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          />
        </h1>
        <div className="flex gap-3">
          <button className="text-primary hover:text-primary-focus">
            <Edit className="w-5 h-5" />
            <span className="sr-only">Edit</span>
          </button>
          <button className="text-error hover:text-error-focus">
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
  );
};

export default BusinessCard;
