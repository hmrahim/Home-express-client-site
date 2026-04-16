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
import AnimatedQuotationButton from "./AnimatedQuotationButton/AnimatedQuotationButton";

const Header = ({ cemail, cart }) => {
  const { email } = useContext(AuthContext);
  const { data: settings } = useGetSettingsQuery();

  const [isOpen, setIsOpen] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  // 🌍 Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["getUserLocation", lat, lng],
    queryFn: () => getUserLocation(lat, lng),
    enabled: !!lat && !!lng,
    refetchInterval: 5000,
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
    <div className="fixed top-0 w-full z-50 overflow-visible">

      {/* 🌿 ANIMATED BACKGROUND */}
      <div className="absolute inset-0 -z-20 animated-header-bg"></div>

      {/* ================= HEADER ================= */}
      <div className="relative text-white opacity-95 mt-[21px]">

        {/* TOP ROW */}
        <div className="px-4 py-1 flex sm:flex-row justify-between items-center gap-3 border-b border-white/20">

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
                {data?.data?.address?.road},
                {data?.data?.address?.suburb},
                {data?.data?.address?.city}
              </p>
            </div>
          </div>

          <AnimatedQuotationButton />
        </div>

        {/* MAIN NAVBAR */}
        <div className="px-4 py-1 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* 🍔 MOBILE MENU FIXED */}
            <div className="dropdown lg:hidden relative z-[9999]">
              <div tabIndex={0} role="button" className="btn btn-ghost text-white">
                ☰
              </div>

              <ul className="menu menu-sm dropdown-content bg-green-600 rounded-box mt-3 w-52 shadow z-[9999] relative">
                {menu}
              </ul>
            </div>

            <Link to="/">
              <img className="h-10" src={settings?.logo?.displayUrl} alt="logo" />
            </Link>

            <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* CENTER */}
          <div className="lg:flex w-1/3">
            <SearchBar setIsOpen={setIsOpen} />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <ul className="hidden lg:flex menu menu-horizontal px-1">
              {menu}
            </ul>

            {cemail || email ? (
              <NavLink
                to="/cart"
                className="flex items-center gap-2 bg-white text-green-600 px-3 py-1 rounded-full font-semibold"
              >
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

      {/* 🌿 ANIMATED BACKGROUND CSS */}
      <style jsx>{`
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-header-bg {
          background: linear-gradient(
            -45deg,
            #16a34a,
            #10b981,
            #059669,
            #047857,
            #22c55e
          );
          background-size: 400% 400%;
          animation: bgMove 10s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;