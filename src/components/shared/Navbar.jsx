import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>

      <li>
        <NavLink>Community</NavLink>
      </li>
      <li>
        <NavLink>About Us</NavLink>
      </li>
      <li>
        <NavLink>Trips</NavLink>
      </li>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-sm bg-green-400">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="hidden justify-center items-center md:flex lg:flex">
        <img className="w-20 h-18 rounded-2xl" src="src/assets/logo (2).png"></img>
        {/* <a className="btn btn-ghost text-xl pl-1 hidden md:flex lg:flex">ExploreEase</a> */}
        <div className="flex flex-col pl-2">
        <p className="font-bold"><span className='text-blue-900 text-2xl font-'>Explore</span>
      <span className='text-green-600 font-bold text-2xl'>Ease </span>
      
      
    </p>
    <p className="text-green-400 text-sm">"Find Your Next Adventure"</p>
        </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <NavLink to='/login' className="btn">Login</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
