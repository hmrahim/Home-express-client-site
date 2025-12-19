import React from "react";
import ViewOrdersRow from "../Orders/ViewOrdersRow";
import { SaudiRiyal } from "lucide-react";

const OrderHistoryRow = ({ orders }) => {
  const date = new Date(orders?.createdAt).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
   hour: 'numeric',
  minute: '2-digit',
  hour12: true
});
  


  return (
    <div className="bg-base-100 border-base-300 collapse border mt-5 font-sans shadow-lg shadow-gray-300">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-gray-200  text-gray-950  peer-checked:bg-gray-200 peer-checked:text-gray-950">
        <div className="flex justify-between">
          <strong>{date && date}</strong>
          <strong>{orders?.orderNo}</strong>
          <strong className="flex items-center"><SaudiRiyal size={20} /> {orders?.totalAmount}</strong>
          <strong className={`
            ${orders?.status=== "cancelled" ? "bg-red-600 " : ""}
            ${orders?.status=== "confirmed" ? "bg-green-600 " : ""}
            ${orders?.status=== "delivered" ? "bg-primary " : ""}
            ${orders?.status=== "pending" ? "bg-error " : ""}

            
            capitalize text-white px-3 py-1 rounded-3xl`}>{orders.status}</strong>
        </div>
      </div>
      <div className="overflow-x-auto collapse-content bg-primary text-primary-content peer-checked:bg-base-200 peer-checked:text-gray-950">
        <table className="w-full text-sm text-left rtl:text-right text-body mt-5">
                     <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                       <tr className="bg-gray-400  text-gray-950">
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
                       {orders?.orders.map((order) => (
                         <ViewOrdersRow orders={order} />
                       ))}
                     </tbody>
                   </table>
      </div>
    </div>
  );
};

export default OrderHistoryRow;
