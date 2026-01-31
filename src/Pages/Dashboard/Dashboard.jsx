import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet,useLocation } from "react-router-dom";
import MenuList from "./MenuList";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import CustomersDashboard from "./Customers-Dashboard/CustomersDashboard";
import PaperPlainLoader from "../Components/Loader/PaperPlainLoader";
import { Helmet } from "react-helmet-async";
import { fetchCart, getUserByEmail } from "../../api/AllApi";
import { getAuth } from "firebase/auth";
import { useRef, useEffect } from "react";


const Dashboard = () => {



  const email = getAuth()?.currentUser?.email;
  const { data, isPending } = useQuery({
    queryKey: ["getUserByEmail"],
    queryFn: () => getUserByEmail(email),
    refetchInterval: 1000,
  });

  const { data: cart } = useQuery({
    queryKey: ["fetchCart"],
    queryFn: () => fetchCart(email),
    refetchInterval: 1000,
  });
  let activeUser = "";

  if (isPending) {
    return <PaperPlainLoader />;
  } else {
    activeUser = data?.data;

    return (
      <AuthContextDashboard.Provider value={{ email, activeUser, cart }}>
        
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        {activeUser && (
          <div>
            
            {activeUser?.rol === "user" || activeUser?.rol === "rider" ? (
              <CustomersDashboard />
            ) : (
              <AdminDashboard />
            )}
          </div>
        )}
      </AuthContextDashboard.Provider>
    );
  }
};
export default Dashboard;
