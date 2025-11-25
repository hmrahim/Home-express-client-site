import React from "react";
import { MdPending } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import RecentOrders from "./RecentOrders";

const Orders = () => {
  return (
    <div className="bg-base-200 pt-10 px-5 md:px-0">
      <div className=" md:w-4/5 min-h-[400px]  w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success px-5 my-5">
        <h1 className="text-2xl font-bold text-primary text-center pb-2">
          All Orders
        </h1>
        <hr className="h-1 bg-primary mb-4" />
        <div class="sm:hidden">
          <label for="tabs-icons" class="sr-only">
            Select your country
          </label>
          <select
            id="tabs-icons"
            class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand px-3 py-2.5 shadow-xs placeholder:text-body"
          >
            <option>Recent Orders</option>
            <option>Confirmd orders</option>
            <option>Delivered Orders</option>
            <option>Cancelled Orders</option>
          </select>
        </div>

        <ul class="hidden text-sm font-medium text-center text-body sm:flex -space-x-px gap-5">
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class="inline-flex items-center justify-center w-full text-body bg-neutral-primary-soft border border-default rounded-s-base hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
              aria-current="page"
            >
              <MdPending />
              Recent Orders
            </a>
          </li>
          <li class="w-full focus-within:z-10 ">
            <a
              href="#"
              class="inline-flex items-center justify-center  w-full text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <GiConfirmed />
              Confirmed Orders
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class="inline-flex items-center justify-center  w-full text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <TbTruckDelivery />
              Delivered Orders
            </a>
          </li>
          <li class="w-full focus-within:z-10">
            <a
              href="#"
              class="inline-flex items-center justify-center  w-full text-body bg-neutral-primary-soft border border-default rounded-e-base hover:bg-neutral-secondary-medium hover:text-heading focus:ring-4 focus:ring-neutral-secondary-strong font-medium leading-5 text-sm px-4 py-2.5 focus:outline-none hover:bg-primary hover:text-white bg-base-300"
            >
              <MdOutlineCancelScheduleSend />
              Cancelled Orders
            </a>
          </li>
        </ul>
        <div
          className="
        overflow-y-scroll
        overflow-x-scroll
          
         my-4 overflow-scroll 
         bg-scroll-primary
          h-[400px]
           [&::-webkit-scrollbar]:w-2 
           [&::-webkit-scrollbar-thumb]:bg-primary
            [&::-webkit-scrollbar-thumb]:rounded-lg
            "
        >

<RecentOrders/>


        </div>
      </div>
    </div>
  );
};

export default Orders;
