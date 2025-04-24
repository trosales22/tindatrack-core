import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const businesses = [
  { id: 1, name: "Sari-Sari Store", type: "Retail" },
  { id: 2, name: "Online Resell", type: "E-commerce" },
  { id: 3, name: "Mini Eatery", type: "Food & Beverage" },
];

const BusinessSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Your Businesses</h1>

      <div className="space-y-4">
        {businesses.map((business) => (
            <div
            key={business.id}
            className="w-full bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/businesses/${business.id}`)}
            >
            <div>
                <h2 className="text-lg font-medium text-base-content">{business.name}</h2>
                <p className="text-sm text-neutral-content">{business.type}</p>
            </div>

            <button
                className="btn btn-sm btn-ghost"
                onClick={() => navigate(`/businesses/${business.id}`)}
            >
                <ArrowRight className="w-5 h-5" />
            </button>
            </div>
        ))}
      </div>
    </>
  );
};

export default BusinessSection;
