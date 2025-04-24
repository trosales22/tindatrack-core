import {
    BarChart2,
    FileText,
    ShoppingCart,
    DollarSign
  } from "lucide-react";
import Wrapper from "components/Wrapper";

interface DashboardSectionProps {
    businessId: string | undefined;
}

const BDDashboardSection: React.FC<DashboardSectionProps> = ({ businessId }) => {   
    console.log(businessId) 
    return (
        <Wrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                    <div className="flex items-center gap-4">
                    <ShoppingCart className="text-primary w-6 h-6" />
                    <div>
                        <p className="font-semibold">Sales Today</p>
                        <p className="text-sm text-neutral-content">₱0.00</p>
                    </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                    <div className="flex items-center gap-4">
                    <FileText className="text-info w-6 h-6" />
                    <div>
                        <p className="font-semibold">Inventory Items</p>
                        <p className="text-sm text-neutral-content">0 items</p>
                    </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                    <div className="flex items-center gap-4">
                    <DollarSign className="text-success w-6 h-6" />
                    <div>
                        <p className="font-semibold">Total Investments</p>
                        <p className="text-sm text-neutral-content">₱0.00</p>
                    </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-md rounded-xl p-4">
                    <div className="flex items-center gap-4">
                    <BarChart2 className="text-warning w-6 h-6" />
                    <div>
                        <p className="font-semibold">Profit/Loss (This Month)</p>
                        <p className="text-sm text-neutral-content">₱0.00</p>
                    </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default BDDashboardSection;