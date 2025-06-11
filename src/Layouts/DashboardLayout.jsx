import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  User,
  Calendar,
  BookOpenText,
  PlusCircle,
  Mountain,
  Menu,
  HomeIcon,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import useAuth from "../components/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeNote from "../components/WelcomeNote"

const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Auto-close sidebar on route change (for mobile)
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { to: '/dashboard/profile', label: 'Manage Profile', icon: <User className="w-5 h-5" /> },
    { to: '/dashboard/bookings', label: 'My Bookings', icon: <Calendar className="w-5 h-5" /> },
    { to: '/dashboard/stories/manage', label: 'Manage Stories', icon: <BookOpenText className="w-5 h-5" /> },
    { to: '/dashboard/stories/add', label: 'Add Stories', icon: <PlusCircle className="w-5 h-5" /> },
    { to: '/dashboard/become-guide', label: 'Join as Tour Guide', icon: <Mountain className="w-5 h-5" /> }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {(menuOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`bg-green-300 shadow-md p-4 space-y-6 w-64 md:block fixed md:static z-30 h-full`}
          >
            {/* Logo + Close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                <img src="/src/assets/logo (2).png" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <p>
                    <span className="font-bold text-xl text-blue-900">Explore</span>
                    <span className="text-green-700 font-bold text-lg">Ease</span>
                  </p>
                  <span className="text-xs text-green-300 italic">Find Your Next Adventure</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="md:hidden text-red-700 hover:text-red-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-4">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  {icon} {label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile menu button */}
        <div className="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
          <button onClick={() => setMenuOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-lg font-semibold text-blue-600">ExploreEase</div>
        </div>

        {/* Header */}
        <div className="p-4 bg-blue-400 flex justify-end items-center gap-4 shadow-md">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-green-600">Welcome back, {user?.displayName}!</p>
            <p className="text-sm text-gray-100">Your travel dashboard</p>
          </div>
          
        </div>
        

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
