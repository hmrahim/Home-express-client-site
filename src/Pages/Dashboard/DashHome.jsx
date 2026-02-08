import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import MyOrder from "./Customers-Dashboard/MyOrder";
import CurrentOrders from "./Customers-Dashboard/CurrentOrders";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { fetchActiveUser, getVisitor } from "../../api/AllApi";

import {
  FaBoxOpen,
  FaTags,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaMotorcycle,
  FaChartLine,
  FaStore,
  FaClipboardList,
  FaGift,
  FaGlobe,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import TraficChart from "../Components/Charts/TraficChart";
import PreBackButton from "../Components/PreBackButton";
import OrderStatusChart from "../Components/Charts/OrderStatusChart";

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

  const visitorData = [
    { date: "01 Feb", visitors: 120 },
    { date: "02 Feb", visitors: 260 },
    { date: "03 Feb", visitors: 300 },
    { date: "04 Feb", visitors: 220 },
    { date: "05 Feb", visitors: 350 },
  ];

 
  const { data: visitor, isPending: pendingVisitor } = useQuery({
    queryKey: ["getVisitors"],
    queryFn: () => getVisitor(date),
    refetchInterval: 1000,
  });

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0 min-h-screen py-10">
        <div className="min-h-screen  md:w-11/12 w-full  mx-auto py-5 bg-base-100 p-4 border border-success">
          <PreBackButton title="Dashboard" /> <hr className="h-1 bg-primary" />
          <div className="grid md:grid-cols-2 gap-12 mt-5">
            <TraficChart data={visitorData} />
         <OrderStatusChart/>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DashHome;
