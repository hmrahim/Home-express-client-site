import React from "react";
import ViewOrdersRow from "./ViewOrdersRow";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchConfirmOrderById,
  fetchRider,
  updateConfirmOrderStatus,
} from "../../../api/AllApi";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ConfirmDelivery from "./ConfirmDelivery";
import DeliveryAnimation from "./DeliveryAnimation";
import { SaudiRiyal } from "lucide-react";

const ViewOrder = () => {
  const { id } = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["fetchConfirmOrderById"],
    queryFn: () => fetchConfirmOrderById(id),
    refetchInterval: 1000,
  });
  const { data: rider, isPending: isRiderPending } = useQuery({
    queryKey: ["fetchRider"],
    queryFn: fetchRider,
    refetchInterval: 1000,
  });

  const withDscount = data?.orders.filter((data) => data.discount !== "");
  const withoutDiscount = data?.orders.filter((data) => data.discount === "");
  //   console.log(withDscount);
  //   console.log(withoutDiscount);

  const amountWithOutDiscount = withoutDiscount?.reduce(
    (previousValue, currentValue) => {
      return (
        previousValue +
        Number(currentValue.price) * Number(currentValue.quantity)
      );
    },
    0
  );

  const discAmount = withDscount?.reduce((previousValue, currentValue) => {
    return (
      previousValue +
      (Number(currentValue.price) *
        Number(currentValue.quantity) *
        Number(currentValue.discount)) /
        100
    );
  }, 0);

  const totalAmount = withDscount?.reduce((previousValue, currentValue) => {
    return (
      previousValue + Number(currentValue.price) * Number(currentValue.quantity)
    );
  }, 0);

  const totalAmoutWithDIscountAndWithoutDiscount =
    totalAmount - discAmount + amountWithOutDiscount;


  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => updateConfirmOrderStatus(id, data),
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, status: "confirmed",totalAmount: totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)});

    if (mutation.isPending === false) {
      toast.success("Order confirmed successfully");
      reset();
    }
  };

  return (
    <div>
      <div className="flex gap-5 flex-col md:flex-row">
        <div className="md:w-3/5 w-full rounded-xl shadow-2xl ">
          <div
            className="
          relative  bg-neutral-primary-soft
           shadow-xs rounded-base
            border
             border-default
               overflow-y-scroll
        overflow-x-scroll
          
       overflow-scroll 
         bg-scroll-primary
        
           [&::-webkit-scrollbar]:w-2 
           [&::-webkit-scrollbar-thumb]:bg-primary
            [&::-webkit-scrollbar-thumb]:rounded-lg
             "
          >
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr className="bg-primary text-white">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.orders.map((order) => (
                  <ViewOrdersRow orders={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:w-2/5 w-full rounded-xl shadow-2xl transition-shadow">
          <h1 className="bg-primary p-1 text-center text-white font-bold">
            Summary
          </h1>
          <div className="px-3">
            <div className="flex justify-between">
              <h3>Sub Total</h3>
              <strong className="flex items-center"><SaudiRiyal size={18}/> {totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between">
              <h3>Shipping Fees</h3>
              <strong className="text-green-600">Free</strong>
            </div>
            <hr className="h-1 bg-primary my-1" />
            <div className="flex justify-between">
              <h3>
                Total <span className="text-xs">(incld vat)</span>{" "}
              </h3>
               <strong className="flex items-center"><SaudiRiyal size={18}/> {totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}</strong>
            </div>
          </div>
          <h1 className="bg-primary p-1 text-center text-white font-bold my-3">
            Order Details
          </h1>
          <div className="px-3">
            <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
              <h3>Payment Type</h3>
              <strong className="capitalize">{data?.payType}</strong>
            </div>
            <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
              <h3>Payment Status</h3>
              <strong
                className={`${
                  data?.status === "delivered"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {data?.status === "delivered" ? "Paid" : "Pending"}
              </strong>
            </div>
            <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
              <h3>Order Status</h3>
              <strong
                className={`
                ${data?.status === "cancelled" ? "text-red-600" : ""}
                ${data?.status === "delivered" ? "text-green-600" : ""}
                ${data?.status === "pending" ? "text-warning" : ""}
                ${
                  data?.status === "confirmed"
                    ? "text-green-600 capitalize"
                    : ""
                }

                `}
              >
                {data?.status}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="w-full md:w-3/5 shadow-2xl rounded-xl">
            <h1 className=" w-full bg-primary p-1 text-center text-white font-bold my-3">
              Shipping Address
            </h1>
            <div className="grid grid-cols-1  md:grid-cols-2 md:gap-4 md:px-2 px-2">
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Castumar Name</h3>
                <strong className="text-orange-600">
                  {data?.address.name}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Castumar Email</h3>
                <strong className="text-orange-600">
                  {data?.address.email}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Castumar Number</h3>
                <strong className="text-orange-600">
                  {data?.address.number}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>City</h3>
                <strong className="text-orange-600">
                  {data?.address.city}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Rigion</h3>
                <strong className="text-orange-600">
                  {data?.address.region}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Building No</h3>
                <strong className="text-orange-600">
                  {data?.address.building}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Area</h3>
                <strong className="text-orange-600">
                  {data?.address.area}
                </strong>
              </div>
              <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer  px-1">
                <h3>Full Address</h3>
                <strong className="text-orange-600">
                  {data?.address.address}
                </strong>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 shadow-2xl rounded-xl">
            <h1 className=" w-full bg-primary p-1 text-center text-white font-bold my-3">
              Order Status
            </h1>
            {data?.status === "delivered" ? (
              <DeliveryAnimation />
            ) : (
              <>
                {data?.status === "confirmed" ? (
                  <ConfirmDelivery
                    total={totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}
                    order={data}
                  />
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-sm mx-auto"
                  >
                    <label
                      for="countries"
                      className="block mb-2.5 text-sm font-medium text-heading"
                    >
                      Select Rider
                    </label>
                    <select
                      // disabled= {data?.status === "cancelled" ||"delivered" ? true : false}
                      disabled={data?.status === "pending" ? false : true}
                      // disabled= {data?.status === "delivered" ? true : false}
                      {...register("rider", {
                        required: {
                          value: true,
                          message: "Rider is required",
                        },
                      })}
                      className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                    >
                      <option disabled>Choose a rider</option>
                      {isRiderPending ? (
                        <option>Loading...</option>
                      ) : (
                        <>
                          {rider?.map((rider) => (
                            <option key={rider._id} value={rider.email}>
                              {rider.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    {errors.rider?.type === "required" && (
                      <span className="mt-1 text-red-600">
                        {errors.rider.message}
                      </span>
                    )}
                    <div className="flex justify-center">
                      <button
                        // disabled= {data?.status === "cancelled" ||"delivered" ? true : false}
                        // disabled= {data?.status === "cancelled" ? true : false}
                        // disabled= {data?.status === "delivered" ? true : false}
                        disabled={data?.status === "pending" ? false : true}
                        className="btn btn-primary btn-sm  mt-5 "
                      >
                        {mutation.isPending ? "Loading..." : "Confirm Order"}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewOrder;
