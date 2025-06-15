import { NavLink } from "react-router-dom";
import { HandMetal, Home, MagnetIcon, ProjectorIcon, User } from "lucide-react";
import { FaRegAddressCard } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <nav className="space-y-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-blue-200 text-blue-800 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        <Home className="w-5 h-5" /> Home
      </NavLink>
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-blue-200 text-blue-800 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        <MagnetIcon className="w-5 h-5" /> Manage Profile
      </NavLink>
      <NavLink
        to="/dashboard/admin/manage-users"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-blue-200 text-blue-800 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        <HandMetal className="w-5 h-5" />  Manage Users
      </NavLink>
      <NavLink
        to="/dashboard/admin/Add-package"
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
            isActive
              ? "bg-blue-200 text-blue-800 font-semibold"
              : "text-gray-700 hover:text-blue-600"
          }`
        }
      >
        <FaRegAddressCard className="w-5 h-5" /> Add Package
      </NavLink>
    </nav>
  );
};

export default AdminMenu;
