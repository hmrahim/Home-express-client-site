import React from 'react';
import { fetchConfirmOrders } from '../../../api/AllApi';
import { useQuery } from '@tanstack/react-query';
import OrderRow from './OrderRow';
import { Helmet } from 'react-helmet-async';

const DeliveredOrder = () => {
   const { data, isPending, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: fetchConfirmOrders,
        refetchInterval: 1000,
      });

      const deliveredOrder = data?.filter((order)=> order?.status === "delivered")
    
      return (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <Helmet>
                  <title>Dashboard-Delivered-Orders</title>
                </Helmet>
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body  bg-primary text-white border-b rounded-base border-default">
              <tr>
                
                 <th scope="col" className="px-6 py-3 font-medium">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Customar Email
                </th>
    
                <th scope="col" className="px-6 py-3 font-medium">
                  Order Number
                </th>
                <th scope="col" className="px-6 py-3 font-medium"></th>
    
                <th scope="col" className="px-6 py-3 font-medium">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Status
                </th>
                 <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mt-5">
              {deliveredOrder?.map((order) => (
                <OrderRow orders={order} key={order._id} />
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default DeliveredOrder;