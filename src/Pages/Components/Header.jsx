import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import auth from "../../firebase.init";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import { AuthContextDashboard } from "../Dashboard/AuthClient/AuthContextDashboard";
import "./custom.css";

const Header = ({ cemail }) => {
  const { email, settings } = useContext(AuthContext);

  const { data, isPending, refetch } = useQuery({
    queryKey: ["CartLength"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/cart/${email}`),
    refetchInterval: 1000,
  });
  // console.log(data);

  const menu = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {email && (
        <li>
          <Link className="" to="/dashboard">
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-primary text-base-100 shadow-sm fixed flex justify-between top-0 z-10 opacity-95">
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
        

          <div class="neon-container">
            <h1 class="neon-text capitalize text-4xl font-bold">{settings?.websiteName}</h1>
          </div>
        </div>
        {/* ================================================= */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        <div className="flex justify-center items-center gap-2">
          {cemail || email ? (
            <Link to="/cart" className="btn ">
              {data?.data.length}

              <FaCartPlus className="text-2xl text-primary" />
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
