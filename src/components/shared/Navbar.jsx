import React, { useContext } from "react";
import {motion}  from "framer-motion";

import { FaSignOutAlt, FaTachometerAlt, FaBullhorn } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); 

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged Out!", "You have been logged out.", "success");
          })
          .catch(error => console.error(error));
      }
    });
  };



const navLinks = (
  <>
    {[
      { path: "/", label: "Home" },
      { path: "/community", label: "Community" },
      { path: "/about", label: "About Us" },
      { path: "/trips", label: "Trips" },
    ].map(({ path, label }) => (
      <li key={path} className="relative">
        <NavLink
          to={path}
          className={({ isActive }) =>
            isActive
              ? "text-fuchsia-500 font-bold"
              : "text-white hover:text-fuchsia-400 font-semibold transition-colors duration-300"
          }
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center">
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="h-[1px] w-10 bg-fuchsia-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          )}
        </NavLink>
      </li>
    ))}

    {!user && (
      <li className="relative">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive
              ? "text-fuchsia-500 font-bold"
              : "text-white hover:text-green-400 font-semibold transition-colors duration-300"
          }
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center">
              <span>Register</span>
              {isActive && (
                <motion.div
                  layoutId="underline"
                  className="rounded-full h-[1px] w-10 bg-fuchsia-500 "
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          )}
        </NavLink>
      </li>
    )}
  </>
);

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "pulse" }}
      className="navbar bg-green-400 shadow-md fixed top-0 left-0 z-50"
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Logo */}
        <Link to="/" className="hidden md:flex lg:flex items-center gap-2 pl-2">
          <img src="/src/assets/logo (2).png" alt="logo" className="w-10 h-10 rounded-full" />
          <div className="hidden md:flex lg:flex flex-col leading-4">
          <p>
          <span className="font-bold text-xl text-blue-900">Explore</span>
          <span className="text-green-700 font-bold text-lg">Ease</span>
          </p>
          <span className="text-xs text-green-100 italic">Find Your Next Adventure</span>
         
          </div>
          
        </Link>

        {/* Mobile Dropdown */}
        <div className="dropdown ml-1 left-0 md:hidden lg:hidden flex">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end pr-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "/default-avatar.png"} alt="profile" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-4 shadow bg-base-100 rounded-box w-60"
            >
              <div className="text-center mb-2">
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <li>
                <NavLink to="/dashboard" className="flex items-center gap-2">
                  <FaTachometerAlt /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/announcements" className="flex items-center gap-2">
                  <FaBullhorn /> Offer Announcements
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500">
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn hidden btn-ghost  hover:text-fuchsia-500 hover:bg-transparent hover:border-fuchsia-500 text-xl btn-outline shadow md:flex">Login</NavLink>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
