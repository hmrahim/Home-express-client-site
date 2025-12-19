import React from "react";
import { SaudiRiyal } from "lucide-react";

const ViewOrdersRow = ({ orders }) => {
  return (
    <tr className="bg-neutral-primary border-b-2 hover:bg-green-500 cursor-pointer">
      <th className=" font-medium text-heading  text-center px-3 ">
        <div className="flex items-center gap-4">
          <img src={orders.image} className="w-10 h-10 rounded-xl" alt="" />
          <h2> {orders.name}</h2>
        </div>
      </th>
      <td className="px-6 py-4 text-center flex items-center "><SaudiRiyal size={15}/> {orders.price}</td>
      <td className="px-6 py-4 text-center  ">{orders.quantity} pice</td>
      <td className="px-6 py-4 text-center  ">{orders.discount? orders.discount : 0}%</td>
      <td className="px-6 py-4 text-center flex items-center "><SaudiRiyal size={15}/> {
        orders.discount === " " ? orders.price * orders.quantity : (orders.price * orders.quantity)- (orders.price * orders.quantity * orders.discount / 100) 
        
        }</td>
    </tr>
  );
};

export default ViewOrdersRow;
