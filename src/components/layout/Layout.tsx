import { BarChart3, Building2, Settings } from "lucide-react";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import Wrapper from "../Wrapper";
import { Button, Modal } from "components/ui/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "hooks/auth";
import { useState } from "react";
import { ROLES } from "constants/roles";
import AppLogo from '/images/app-logo.jpeg'
import { useAuthData } from "hooks/useAuthData";
import { useRemoveAuthField } from "hooks/useRemoveAuthField";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [openLogout, setOpenLogout] = useState(false);
    const navigate = useNavigate();
    const { role, firstname, lastname } = useAuthData();
    const userName = firstname && lastname ? `${firstname} ${lastname}` : "Unknown";
    const { removeAuthField } = useRemoveAuthField();

    const { mutate: logout, isPending: isLogoutLoading } = useLogoutMutation({
        onSuccess: () => {
            toast.success("Successfully logged out.");

            removeAuthField('auth_status')
            removeAuthField('firstname')
            removeAuthField('lastname')
            removeAuthField('token')
            removeAuthField('role')
            
            navigate("/login");
        },
        onError: () => {}
    })

    const onShowLogoutModal = () => {
        setOpenLogout(true)
    }

    const onLogoutHander = () => {
        logout({})
    }

    const headerNavItems = [
        { label: "Settings", onClick: () => navigate('/settings') },
        { label: "Logout", onClick: onShowLogoutModal }
    ];

    const allMenuItems = [
        { label: "Businesses", icon: <Building2 className="h-5 w-5" />, path: "/", roles: [ROLES.BUSINESS_ADMIN] },
        { label: "Summary Report", icon: <BarChart3 className="h-5 w-5" />, path: "/summary-report", roles: [ROLES.BUSINESS_ADMIN] }, 
        { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings", roles: [ROLES.BUSINESS_ADMIN] }
    ];

    const sidebarMenuItems = allMenuItems.filter(item => item.roles.includes(role));
    
    const roleMap: Record<string, string> = {
        [ROLES.SUPER_ADMIN]: 'Super Administrator',
        [ROLES.BUSINESS_ADMIN]: 'Business Administrator'
    };
    
    const formattedRole = roleMap[role] || 'Unknown';

    return (
        <Wrapper>
            <Navbar 
                appName="TindaTrack Portal" 
                bgColor="bg-[#0B1F3A] backdrop-blur-md"
                avatarSrc={AppLogo}
                dropdownItems={headerNavItems}
                userName={userName}
                userNameColor="text-white"
                role={formattedRole}
                roleTextColor="text-gray-100"
                sidebarItems={sidebarMenuItems}
            />

            <div className="flex flex-col md:flex-row md:overflow-hidden max-w-full overflow-x-hidden">
                <Sidebar 
                    bgColor="bg-[#0B1F3A]" 
                    items={sidebarMenuItems} 
                    sidebarProps="text-white hover:bg-white/10 hover:text-white"
                />
                <div className="flex-1 p-6 mt-2 pt-18 ml-0 md:ml-72 transition-all duration-300 max-w-full">
                    {children}
                </div>
            </div>

            <Modal
                id="logout-modal"
                title="Confirm Logout"
                isOpen={openLogout}
                onClose={() => setOpenLogout(false)}
                headerColor="red"
            >
                <p>Are you sure you want to logout?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="ghost" onClick={() => setOpenLogout(false)}>No</Button>
                    <Button variant="danger" className="text-white" onClick={onLogoutHander} disabled={isLogoutLoading}>{isLogoutLoading ? 'Logging out..' : 'Yes'}</Button>
                </div>
            </Modal>
        </Wrapper>
    );
};

export default Layout;
