import { NavLink } from "react-router-dom";
import { HomeIcon, User, Calendar, BookOpenText, PlusCircle, Mountain } from "lucide-react";

const TouristMenu = () => {
  return (
    <nav className="space-y-4">
      <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
        <HomeIcon className="w-5 h-5" /> Home
      </NavLink>
      <NavLink to="/dashboard/profile" className={({ isActive }) => navClass(isActive)}>
        <User className="w-5 h-5" /> Manage Profile
      </NavLink>
      <NavLink to="/dashboard/bookings" className={({ isActive }) => navClass(isActive)}>
        <Calendar className="w-5 h-5" /> My Bookings
      </NavLink>
      <NavLink to="/dashboard/manage-stories" className={({ isActive }) => navClass(isActive)}>
        <BookOpenText className="w-5 h-5" /> Manage Stories
      </NavLink>
      <NavLink to="/dashboard/stories-add" className={({ isActive }) => navClass(isActive)}>
        <PlusCircle className="w-5 h-5" /> Add Stories
      </NavLink>
      <NavLink to="/dashboard/become-guide" className={({ isActive }) => navClass(isActive)}>
        <Mountain className="w-5 h-5" /> Join as Tour Guide
      </NavLink>
    </nav>
  );
};

export default TouristMenu;

const navClass = (isActive: boolean) =>
  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
    isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700 hover:text-blue-600"
  }`;
