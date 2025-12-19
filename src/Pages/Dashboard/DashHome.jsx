import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import MyOrder from "./Customers-Dashboard/MyOrder";
import CurrentOrders from "./Customers-Dashboard/CurrentOrders";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { fetchActiveUser } from "../../api/AllApi";

const DashHome = () => {
  const { email } = useContext(AuthContextDashboard);
  //   const user = useAuthState(auth);
  //   const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["fetchActiveUser"],
    queryFn: () => fetchActiveUser(email),
    refetchInterval: 1000,
  });
  

  if (data?.rol === "user") {
    return <MyOrder />;
  }
  if (data?.rol === "rider") {
    return <CurrentOrders />;
  }

  return (
    <div>
      <h1>admin dashboard</h1>
    </div>
  );
};

export default DashHome;
