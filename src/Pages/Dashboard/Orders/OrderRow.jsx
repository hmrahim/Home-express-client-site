import React from "react";
import { Link } from "react-router-dom";
import { SaudiRiyal } from "lucide-react";

const OrderRow = ({ orders }) => {
  const withDscount = orders.orders.filter((data) => data.discount !== "");
  const withoutDiscount = orders.orders.filter((data) => data.discount === "");
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

  //   console.log(amountWithOutDiscount);
  //   console.log(amountWithOutDiscount);

  const date = new Date(orders?.orders[0]?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );

  return (
    <tr className="hover:bg-green-300 cursor-pointer shadow-2xl mt-2">
      <th scope="col" className="p-4">
        {orders.orders[0].name}
      </th>
      <th scope="col" className="p-4">
        {date}
      </th>
      <th scope="col" className="p-4">
        {orders.email}
      </th>

      <th scope="col" className="px-6 py-3 font-medium">
        {orders.orderNo}
      </th>
      <th scope="col" className="px-6 py-3 font-medium"></th>
      <th scope="col" className="px-6 py-3 font-medium flex items-center">
      <SaudiRiyal size={15}/>  {totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}
      </th>
      <th scope="col" className="px-6 py-3 font-medium">
        {orders.status === "pending" && (
          <button className=" bg-warning btn-xs hover:bg-none px-2 rounded-md ">
            {" "}
            {orders.status}
          </button>
        )}
        {orders.status === "confirmed" && (
          <button className=" bg-green-500 text-white btn-xs hover:bg-none px-2 rounded-md ">
            {" "}
            {orders.status}
          </button>
        )}
        {orders.status === "delivered" && (
          <button className=" bg-success text-white btn-xs hover:bg-none px-2 rounded-md ">
            {" "}
            {orders.status}
          </button>
        )}
        {orders.status === "cancelled" && (
          <button className=" bg-red-600 text-white btn-xs hover:bg-none px-2 rounded-md ">
            {" "}
            {orders.status}
          </button>
        )}
      </th>
      <th>
        <Link
          className=" btn btn-xs btn-primary ml-2"
          to={`/dashboard/orders/view-order/${orders._id}`}
        >
          View
        </Link>
      </th>
    </tr>
  );
};

export default OrderRow;
