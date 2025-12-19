import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
const PolicyLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-300 ">
        <Header/>
      
      <main className="w-full md:w-4/5 mx-auto py-8 mt-10 bg-white rounded-xl shadow  ">
      <div className=" mx-auto py-5 flex justify-center">
          <nav className="flex gap-3">
            <NavLink
              to="privacy-policy"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary hover:text-white"
                }`
              }
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="terms-conditions"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary hover:text-white"
                }`
              }
            >
              Terms & Conditions
            </NavLink>
            <NavLink
              to="refund-policy"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary hover:text-white"
                }`
              }
            >
              Refund Policy

            </NavLink>
          </nav>
        </div>
        
        <div className="">
            
          <Outlet />
        </div>
      </main>
        <Footer/>
      
    </div>
  );
};

export default PolicyLayout;
