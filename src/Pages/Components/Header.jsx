// import { useQuery } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import { useGetSettingsQuery } from "../../redux/features/settings/api/baseApi";
import SearchBar from "./SearchBar";
import SearchModal from "../Client/Home/SearchModal";
import { getUserLocation } from "../../api/AllApi";

const Header = ({ cemail, cart }) => {
  const { email } = useContext(AuthContext);
  const { data: settings } = useGetSettingsQuery();

  const [isOpen, setIsOpen] = useState(false);



      const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
 
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLat(lat);
      setLng(lng);
    },
    (error) => {
      console.error("Location error:", error.message);
    },
    {
      enableHighAccuracy: true, // ⭐ exact এর জন্য
      timeout: 10000,
    },
  );


  const { data, isPending } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: () => getUserLocation(lat, lng),
    refetchInterval:5000
  });


  const menu = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      {email && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="fixed top-0 w-full z-50">

      {/* ================= UNIFIED HEADER ================= */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white opacity-95 mt-[21px] ">

        {/* TOP ROW (Location + Button) */}
        <div className="px-4 py-1 flex  sm:flex-row justify-between items-center gap-3 border-b border-white/20">

          <div className="flex items-center gap-2">
            <div className="relative">
              {isPending && (
                <span className="absolute h-6 w-6 rounded-full bg-white/40 animate-ping"></span>
              )}
              <svg
                className="w-6 h-6 animate-bounce"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
            </div>

            <div>
              <p className="text-xs opacity-80">Your Current Location</p>
              <p className={`font-semibold text-md transition ${isPending ? "opacity-0" : "opacity-100"}`}>
                {data?.data?.address?.road+","+data?.data?.address?.suburb+","+data?.data?.address?.city}
              </p>
            </div>
          </div>

          <NavLink
            to="/dashboard/quotation"
            className="px-1 py-1 text-md bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition"
          >
            Get a Quotation →
          </NavLink>
        </div>

        {/* MAIN NAVBAR ROW */}
        <div className="px-4 py-1 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost text-white">
                ☰
              </div>
              <ul className="menu menu-sm dropdown-content bg-green-600 rounded-box mt-3 w-52 shadow">
                {menu}
              </ul>
            </div>

            <Link to="/" className=" lg:flex">
              <img className="h-10" src={settings?.logo?.displayUrl} alt="logo" />
            </Link>

            <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* CENTER */}
          <div className=" lg:flex w-1/3">
            <SearchBar setIsOpen={setIsOpen} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <ul className="hidden lg:flex menu menu-horizontal px-1">
              {menu}
            </ul>

            {cemail || email ? (
              <NavLink to="/cart" className="flex items-center gap-2 bg-white text-green-600 px-3 py-1 rounded-full font-semibold">
                {cart?.data?.length || 0}
                <FaCartPlus />
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
