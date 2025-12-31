import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import MyOrder from "./Customers-Dashboard/MyOrder";
import CurrentOrders from "./Customers-Dashboard/CurrentOrders";
import { AuthContextDashboard } from "./AuthClient/AuthContextDashboard";
import { fetchActiveUser } from "../../api/AllApi";

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

  const cardsData = [
    // Product / Inventory
    {
      title: "Total Products",
      value: "1,250",
      icon: FaBoxOpen,
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "Active Products",
      value: "1,100",
      icon: FaBoxOpen,
      gradient: "bg-gradient-to-r from-green-500 to-emerald-600",
    },

    {
      title: "New Products (Today)",
      value: "12",
      icon: FaGift,
      gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
    },

    // Category / Brands
    {
      title: "Total Categories",
      value: "48",
      icon: FaTags,
      gradient: "bg-gradient-to-r from-orange-400 to-red-500",
    },
    {
      title: "Active Categories",
      value: "45",
      icon: FaTags,
      gradient: "bg-gradient-to-r from-green-400 to-teal-500",
    },

    {
      title: "Total Brands",
      value: "25",
      icon: FaStore,
      gradient: "bg-gradient-to-r from-sky-500 to-indigo-600",
    },

    // Users
    {
      title: "Total Users",
      value: "9,840",
      icon: FaUsers,
      gradient: "bg-gradient-to-r from-pink-500 to-rose-500",
    },
    {
      title: "Active Users",
      value: "8,500",
      icon: FaUsers,
      gradient: "bg-gradient-to-r from-green-400 to-teal-500",
    },

    // Orders
    {
      title: "Today Orders",
      value: "126",
      icon: FaShoppingCart,
      gradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
    },
    {
      title: "Pending Orders",
      value: "34",
      icon: FaClipboardList,
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      title: "Processing Orders",
      value: "56",
      icon: FaShoppingCart,
      gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
    },
    {
      title: "Shipped Orders",
      value: "25",
      icon: FaMotorcycle,
      gradient: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      title: "Delivered Orders",
      value: "90",
      icon: FaMotorcycle,
      gradient: "bg-gradient-to-r from-indigo-400 to-purple-500",
    },
    {
      title: "Cancelled Orders",
      value: "5",
      icon: FaShoppingCart,
      gradient: "bg-gradient-to-r from-red-500 to-pink-500",
    },
    {
      title: "Returned Orders",
      value: "2",
      icon: FaGift,
      gradient: "bg-gradient-to-r from-gray-400 to-gray-600",
    },

    // Sales
    {
      title: "Today Sales Amount",
      value: "$2,450",
      icon: FaMoneyBillWave,
      gradient: "bg-gradient-to-r from-cyan-500 to-blue-600",
    },
    {
      title: "Weekly Sales Amount",
      value: "$12,300",
      icon: FaMoneyBillWave,
      gradient: "bg-gradient-to-r from-green-500 to-teal-600",
    },
    {
      title: "Monthly Sales Amount",
      value: "$54,300",
      icon: FaMoneyBillWave,
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "Yearly Sales Amount",
      value: "$654,000",
      icon: FaMoneyBillWave,
      gradient: "bg-gradient-to-r from-orange-400 to-red-500",
    },

    // Riders
    {
      title: "Total Riders",
      value: "87",
      icon: FaMotorcycle,
      gradient: "bg-gradient-to-r from-lime-400 to-green-500",
    },

    {
      title: "Delivered Today",
      value: "90",
      icon: FaMotorcycle,
      gradient: "bg-gradient-to-r from-indigo-400 to-purple-500",
    },

    {
      title: "Total Admins",
      value: "5",
      icon: FaUsers,
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0">
        <div className=" md:w-10/12 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <div
            className="grid gap-6 
      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-6"
          >
            {cardsData.map((card, index) => (
              <DashboardCard
                key={index}
                title={card.title}
                value={card.value}
                icon={card.icon}
                gradient={card.gradient}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
