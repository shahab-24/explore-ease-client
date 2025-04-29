import React, { useContext } from "react";

import { motion } from "framer-motion";

import { FaSignOutAlt, FaTachometerAlt, FaBullhorn } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // user info and logout function from your context

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
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/community">Community</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink to="/trips">Trips</NavLink></li>
      {!user && (
        <>
          {/* <li><NavLink to="/login">Login</NavLink></li> */}
          <li><NavLink to="/register">Register</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
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
          <NavLink to="/login" className="btn hidden btn-ghost  btn-outline shadow md:flex">Login</NavLink>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
