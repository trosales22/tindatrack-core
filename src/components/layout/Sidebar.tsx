import { FC } from "react";
import { Link } from "react-router-dom";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  bgColor?: string;
  sidebarProps?: string;
  items: SidebarItem[];
}

const Sidebar: FC<SidebarProps> = ({ bgColor='bg-base-200', sidebarProps='hover:bg-base-300', items }) => {
  return (
    <div className={`h-full w-72 ${bgColor} shadow-lg fixed top-16 left-0 z-5 hidden md:block`}>
      <ul className="menu rounded-box w-full">
        {items.map((item, index) => (
          <li key={index} className="w-full mb-2">
            <Link 
              to={item.path} 
              className={`flex items-center gap-4 w-full text-lg ${sidebarProps} rounded-lg p-3`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
