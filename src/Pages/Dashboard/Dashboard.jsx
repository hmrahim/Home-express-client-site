import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
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

const Dashboard = () => {
  const user = useAuthState(auth);
  const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["userEmail"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/user/${email}`),
  });
  let activeUser = "";

  if (isPending) {
    return <PaperPlainLoader />;
  } else {
    activeUser = data?.data;

    return (
      <AuthContextDashboard.Provider value={(email, activeUser)}>
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
