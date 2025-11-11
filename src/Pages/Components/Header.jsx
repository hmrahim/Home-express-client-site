import React from "react";
import { Link } from "react-router-dom";

import { ToastContainer } from 'react-toastify';

const Header = () => {
  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <a>Services</a>
      </li>
      <li>
        <a>About</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
      <li>
        <Link className="" to="/dashboard">Dashboard</Link>
      </li>
    </>
  );
  
  return (
    <div>
      <div className="navbar bg-primary text-base-100 shadow-sm fixed top-0 z-10 opacity-95">
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
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-primary rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menu}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Home Express</a>
        </div>
        <div className="navbar-center ">
          <label className=" flex justify-center items-center input bg-primary border-1  border-white">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              placeholder="Search what you want"
              className="text-white  bg-primary "
            />
          </label>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {menu}
            <div className="flex justify-center items-center ">
              
                
              
              
             
            </div>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
