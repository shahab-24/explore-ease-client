import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Calendar,
  BookOpenText,
  PlusCircle,
  Mountain,
  Menu,
} from "lucide-react";
import { useState } from "react";
import useAuth from "../components/hooks/useAuth";

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useAuth()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-green-300 shadow-md p-4 space-y-6 w-64 md:block ${menuOpen ? 'block' : 'hidden'} fixed z-20 md:static`}>
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold text-center text-blue-600 mb-4">
          <img src="/src/assets/logo (2).png" className="w-10 h-10 rounded-full"></img>
          <div className="flex flex-col">
          <p>
          <span className="font-bold text-xl text-blue-900">Explore</span>
          <span className="text-green-700 font-bold text-lg">Ease</span>
          </p>
          <span className="text-xs text-green-300 italic">Find Your Next Adventure</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <NavLink
            to="/dashboard/profile"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> Manage Profile
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <Calendar className="w-5 h-5" /> My Bookings
          </NavLink>

          <NavLink
            to="/dashboard/stories/manage"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <BookOpenText className="w-5 h-5" /> Manage Stories
          </NavLink>

          <NavLink
            to="/dashboard/stories/add"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <PlusCircle className="w-5 h-5" /> Add Stories
          </NavLink>

          <NavLink
            to="/dashboard/become-guide"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <Mountain className="w-5 h-5" /> Join as Tour Guide
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile menu button */}
        <div className="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-lg font-semibold text-blue-600">ExploreEase</div>
        </div>

        {/* Profile + Welcome */}
        <div className="p-4 bg-blue-400 flex justify-end items-center gap-4  shadow-md">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-green-600">Welcome back, {user?.displayName}!</p>
            <p className="text-sm text-gray-500">Your travel dashboard</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )};

export default DashboardLayout;
