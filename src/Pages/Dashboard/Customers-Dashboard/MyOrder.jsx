import React, { useContext } from "react";
import PreBackButton from "../../Components/PreBackButton";
import { useQuery } from "@tanstack/react-query";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { fetchConfirmOrderByEmail } from "../../../api/AllApi";
import ViewOrdersRow from "../../Dashboard/Orders/ViewOrdersRow";
import Swal from "sweetalert2";
import axios from "axios";
import OrderTracker from "./OrderTracker";
const MyOrder = () => {
  const { email } = useContext(AuthContextDashboard);
  const { data, isPending } = useQuery({
    queryKey: "fetchConfirmOrderByEmail",
    queryFn: () => fetchConfirmOrderByEmail(email),
    refetchInterval: 10000,
  });

 
  const order = data?.find(
    (order) => order.status === "pending" || order.status === "confirmed"
  );

  const withDscount = order?.orders?.filter((data) => data.discount !== "");
  const withoutDiscount = order?.orders?.filter((data) => data.discount === "");

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

  const canceleOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "If your click on confirm button ! your order will be confirmed",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.put(
          `http://localhost:5000/api/cancel-order/${id}`,
          { status: "cancelled" }
        );
        // if(res.status === 200){
        //   navigate("/dashboard")

        // }

        Swal.fire({
          title: "Confirmed!",
          text: "Your order confirmed succesfully.",
          icon: "success",
        });
      }
    });
  };


  return (
    <div className=" pt-5">
      <PreBackButton title={"My Orders"} />{" "}
      <hr className="h-1 bg-primary mx-4 md:mx-0" />
      {order !== undefined ? (
        <>
        
            <div className=" flex flex-col md:flex-row shadow-xl  justify-between gap-2 bg-base-300   bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
              <div className="w-full md:w-3/5  ">
              <div className="w-full overflow-x-auto">

             
                <table className="text-sm text-left rtl:text-right text-body ">
                  <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                    <tr className="bg-primary text-white">
                      <th scope="col" className="px-6 py-3 font-medium text-center">
                        name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 font-medium  text-center"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 font-medium  text-center"
                      >
                        Quantiy
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 font-medium  text-center"
                      >
                        Discount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 font-medium  text-center"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orders?.map((order) => (
                      <ViewOrdersRow orders={order} />
                    ))}
                  </tbody>
                </table>
                 </div>
                <OrderTracker order={order} />

              </div>
              
              <div className=" w-full md:w-2/5  ">
                <h1 className="bg-primary p-1 text-center text-white font-bold">
                  Summary
                </h1>
                <div className="px-3">
                  <div className="flex justify-between">
                    <h3>Sub Total</h3>
                    <strong>{totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <h3>Shipping Fees</h3>
                    <strong className="text-primary">Free</strong>
                  </div>
                  <hr className="h-1 bg-primary my-1" />
                  <div className="flex justify-between">
                    <h3>
                      Total <span className="text-xs">(incld vat)</span>{" "}
                    </h3>
                    <strong>{totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}</strong>
                  </div>
                </div>
                <h1 className="bg-primary p-1 text-center text-white font-bold my-3">
                  Order Details
                </h1>
                <div className="px-3">
                  <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
                    <h3>Pay Type</h3>
                    <strong className="capitalize">{order?.payType}</strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
                    <h3>Pay Status</h3>
                    <strong className="text-red-600">
                      {order?.status !== "delivered" ? "Pending" : "Paid"}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-gray-500 py-1 my-3 cursor-pointer hover:bg-green-500 px-1">
                    <h3>Order Status</h3>
                    <strong className={`
                      ${order?.status === "pending" && "text-red-600"} 
                      ${order?.status === "confirmed" && "text-green-600"} 
                      ${order?.status === "delivered" && "text-green-600"} 
                      `}>
                      {order?.status === "confirmed" && "On the way"}
                      {order?.status === "pending" && "Pending"}
                      {order?.status === "delivered" && "Delivered"}
                    </strong>
                  </div>
                  <div className="flex gap-4 flex-col justify-center py-1 my-3 cursor-pointer px-1">
                    <button
                    disabled={order?.status === "confirmed" && true}
                      onClick={() => canceleOrder(order?._id)}
                      className="btn bg-red-600 text-white hover:bg-red-500 btn-sm"
                    >
                      Cancele order{" "}
                    </button>
                    <p className="text-xs text-blue-400 text-justify">you can't cancele the order on " on the way " stage.<br/> if you want to cancele the order contact with our support team.</p>
                  </div>
                </div>
              </div>
            </div>
         
        </>
      ) : (
        <h2 className="text-center text-2xl font-bold mt-10">
          You have no orders
        </h2>
      )}
    </div>
  );
};

export default MyOrder;
