import React from "react";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import RecentOrders from "./RecentOrders";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import PreBackButton from "../../Components/PreBackButton";
import { fetchConfirmOrders } from "../../../api/AllApi";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {

   const { data, isPending, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchConfirmOrders,
        refetchInterval: 1000,
      });


      const seenItems = data?.filter((data)=> data.seen === "pending");


  const location = useLocation();
  return (
    <div className="bg-base-200 pt-10 px-5 md:px-0">
      <div className=" md:w-4/5 min-h-[400px]  w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success px-5 my-">
        <PreBackButton title="All-Orders" />
        <hr className="h-1 bg-primary mb-4" />
        

        <ul className=" text-sm font-medium text-center text-body flex -space-x-px gap-5 my-5">
          <li className="w-full focus-within:z-10 relative">
            <Link
              to={`/dashboard/orders`}
              className="inline-flex items-center justify-center text-gray-950 w-full text-body bg-warning border border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
              aria-current="page"
            >
              <MdPending />
              Recent Orders 
              {
                seenItems?.length > 0 &&  <span className="btn btn-xs btn-error ml-3 absolute right-8">{seenItems?.length} </span>
              }
             

             
            </Link>
          </li>
          <li className="w-full focus-within:z-10 ">
            <Link
              to={`/dashboard/orders/confirmed-order`}
              className="inline-flex items-center justify-center text-gray-950  w-full text-body bg-green-500 border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <GiConfirmed />
              Confirmed Orders
            </Link>
          </li>
          <li className="w-full focus-within:z-10">
            <Link
              to={`/dashboard/orders/delivered-order`}
              className="inline-flex items-center justify-center text-gray-950  w-full text-body bg-success border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <TbTruckDelivery />
              Delivered Orders
            </Link>
          </li>
          <li className="w-full focus-within:z-10 ">
            <Link
              to={`/dashboard/orders/canceled-order`}
              className="inline-flex items-center justify-center text-gray-950  w-full text-body bg-red-600 border border-default rounded-e-base hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <MdOutlineCancelScheduleSend />
              Cancelled Orders
            </Link>
          </li>
        </ul>
        <div
          className="
      
            "
        >
          {location.pathname === "/dashboard/orders" ? (
            <RecentOrders />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
