import { NavLink } from "react-router-dom";
import { User, BookOpenText, PlusCircle, Mountain, Home } from "lucide-react";

const GuideMenu = () => {
  return (
    <nav className="space-y-4">
      <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
        <Home className="w-5 h-5" /> Home
      </NavLink>
      <NavLink to="/dashboard/profile" className={({ isActive }) => navClass(isActive)}>
        <User className="w-5 h-5" /> Manage Profile
      </NavLink>
      <NavLink to="/dashboard/manage-stories" className={({ isActive }) => navClass(isActive)}>
        <BookOpenText className="w-5 h-5" /> Manage Stories
      </NavLink>
      <NavLink to="/dashboard/stories-add" className={({ isActive }) => navClass(isActive)}>
        <PlusCircle className="w-5 h-5" /> Add Stories
      </NavLink>
      <NavLink to="/dashboard/guide/assigned-tours" className={({ isActive }) => navClass(isActive)}>
        <Mountain className="w-5 h-5" /> Assigned Tours
      </NavLink>
    </nav>
  );
};

export default GuideMenu;

const navClass = (isActive: boolean) =>
  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
    isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700 hover:text-blue-600"
  }`;
