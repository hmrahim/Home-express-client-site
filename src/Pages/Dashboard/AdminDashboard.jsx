import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import MenuList from "./MenuList";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminDashboard = () => {
  return (
    <div>
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
    </div>
  );
};

export default AdminDashboard;
