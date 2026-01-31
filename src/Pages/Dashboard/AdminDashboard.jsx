import React from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import MenuList from "./MenuList";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Footer from "../Components/Footer";
import { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

const AdminDashboard = () => {
   const loadingRef = useRef(null);
  
    const location = useLocation();
  
    useEffect(() => {
      loadingRef.current.continuousStart();
  
      setTimeout(() => {
        loadingRef.current.complete();
      }, 500);
    }, [location]);
























  return (
    <div>
      <LoadingBar className="rounded-xl" color="linear-gradient(135deg, red, pink, yellow)" height={5} ref={loadingRef}  loaderSpeed={400}  shadow={true} />
      <Navbar />
      <div>
        <div className="drawer top-16 drawer-mobile">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <Outlet />
          </div>
          <div className="drawer-side top-16 ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu   w-60 min-h-full bg-gradient-to-t from-green-500 to-emerald-600 text-white">
              {/* Sidebar content here */}
              <MenuList />
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
