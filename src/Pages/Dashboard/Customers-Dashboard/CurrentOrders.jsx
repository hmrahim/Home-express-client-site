import React, { useContext } from "react";
import PreBackButton from "../../Components/PreBackButton";
import { fetchRiderWithOrders } from "../../../api/AllApi";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { useQuery } from "@tanstack/react-query";
import ViewOrdersRow from "../Orders/ViewOrdersRow";
import ConfirmDelivery from "../Orders/ConfirmDelivery";
import RiderSearchindComponent from "../Customers-Dashboard/RiderSearchingComponent";
import OpenMap from "./OpenMap";

const CurrentOrders = () => {
  const { email } = useContext(AuthContextDashboard);

  const { data, isPending } = useQuery({
    queryKey: ["fetchRiderWithOrders"],
    queryFn: () => fetchRiderWithOrders(email),
    refetchInterval: 1000,
  });
  

  
  const confirmOrder = data?.orders?.find((data) => data?.status === "confirmed");
  
  const location = confirmOrder?.address?.location

  const withDscount = confirmOrder?.orders.filter(
    (data) => data?.discount !== ""
  );
  const withoutDiscount = confirmOrder?.orders.filter(
    (data) => data?.discount === ""
  );
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

  return (
    <div className="p-4 ">
      <PreBackButton title="Current Orders" />{" "}
      <hr className="h-1 bg-primary mb-4 " />
     
      {
        confirmOrder === undefined ? <RiderSearchindComponent /> :
     
      <>
        <div className="bg-base-300 rounded-2xl shadow p-5 mb-5 font-sans">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Order: {confirmOrder?.orderNo}</h2>
            <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
              In Progress
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
                P
              </div>
              <div>
                <p className="text-sm font-semibold">Pickup From</p>
                <p className="text-sm text-gray-600">Home Express Wear House</p>
              </div>
            </div>

            <div className="ml-5 border-l-2 border-dashed border-white h-6"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full font-bold">
                D
              </div>
              <div>
                <p className="text-sm font-semibold">Deliver To</p>
                <p className="text-sm text-gray-600">
                  House #{confirmOrder?.address.building}, Street :{" "}
                  {confirmOrder?.address.area},{" "}
                  {confirmOrder?.address.city},
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-primary text-white rounded-xl text-sm">
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {confirmOrder?.address?.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {confirmOrder?.address?.number}
            </p>
          </div>
        </div>
        {/* <!-- Order Details --> */}
        <div className="bg-base-300 rounded-2xl shadow p-5   mb-5">
          <h3 className="text-lg font-semibold mb-3">Orders Items</h3>{" "}
          <hr className="h-1 bg-primary mb-2" />
          <div className="divide-y overflow-x-auto">
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
                {confirmOrder?.orders.map((orders) => (
                  <ViewOrdersRow key={orders._id} orders={orders} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 b pt-3 flex items-center justify-between text-sm font-semibold ">
            <span>Total</span>
            <span className="font-sans">
              {totalAmoutWithDIscountAndWithoutDiscount} SAR
            </span>
          </div>
        </div>
        <div className=" bg-base-300 rounded-2xl flex items-center justify-center p-4">
          <div className="w-full   rounded-2xl ">
            {/* <!-- Header --> */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Delivery Confirmation
              </h2>
              <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-sans">
                Order {confirmOrder?.orderNo}
              </span>
            </div>

      
           

            {/* <!-- Package Info --> */}
            <div className="flex flex-col md:flex-row justify-center items-center bg-gray-50 p-4 rounded-xl border mb-4">
              <div className="">
                
                <h3 className="text-gray-950 font-medium">Package Info</h3>
                <p className="text-sm text-gray-950 mt-1">
                  Payment Method:{" "}
                  <span className="font-semibold">Cash on Delivery</span>
                </p>
                <p className="text-sm text-gray-950">
                  Amount:{" "}
                  <span className="font-semibold text-green-600">
                    {totalAmoutWithDIscountAndWithoutDiscount}
                  </span>
                </p>
                <OpenMap location={location} />
              </div>
              <div className="">
                <ConfirmDelivery
                  total={totalAmoutWithDIscountAndWithoutDiscount}
                  order={confirmOrder}
                />
              </div>
            </div>

            {/* <!-- Confirm Button --> */}
          </div>
        </div>
      </>
       }
    </div>
  );
};

export default CurrentOrders;
