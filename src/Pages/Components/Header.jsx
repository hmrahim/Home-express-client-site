import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCartPlus } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import auth from "../../firebase.init";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import { AuthContextDashboard } from "../Dashboard/AuthClient/AuthContextDashboard";
import "./custom.css";

import { useGetSettingsQuery } from "../../redux/features/settings/api/baseApi";
import SearchBar from "./SearchBar";
import MarqueeHeader from "./MarqueeHeader";
import SearchModal from "../Client/Home/SearchModal";

const Header = ({ cemail, cart }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { email } = useContext(AuthContext);
  const { data: settings, isLoading } = useGetSettingsQuery();

  const menu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      {/* <li>
        <NavLink to="/about">About</NavLink>
      </li> */}
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      {email && (
        <li>
          <NavLink className="" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="flex flex-col fixed mt-0 z-10 opacity-95 ">
      <div style={{height:"15px",paddingY:0}}  className="navbar bg-gradient-to-r from-green-500 to-emerald-600 text-base-100 shadow-sm fixed flex justify-between top-6 z-10 ">
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
              className="menu menu-sm dropdown-content bg-gradient-to-l from-green-500 to-emerald-600 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menu}
            </ul>
          </div>
          <Link to="/">
            <div className=" hidden lg:flex">
              <img className="h-12" src={settings?.logo.displayUrl} alt="" />
              {/* <h1 className="neon-text capitalize text-4xl font-bold">{settings?.websiteName}</h1> */}
            </div>
            <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </Link>
        </div>
        <div className="navbar-center flex justify-center items-center">
          <SearchBar setIsOpen={setIsOpen} />
        </div>

        {/* ================================================= */}
        <div className="navbar-end ">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{menu}</ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            {cemail || email ? (
              <NavLink to="/cart" className="btn btn-sm">
                {cart?.data.length}

                <FaCartPlus className="text-2xl text-primary" />
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
