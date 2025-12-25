import React, { useContext } from "react";
import PreBackButton from "../../Components/PreBackButton";
import OrderHistoryRow from "./OrderHistoryRow";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { useQuery } from "@tanstack/react-query";
import { fetchAllConfirmOrderByEmail } from "../../../api/AllApi";
import { Helmet } from "react-helmet-async";

const OrderHistory = () => {
  const { email } = useContext(AuthContextDashboard);
  const { data, isPending } = useQuery({
    queryKey: ["fetchAllConfirmOrderByEmail"],
    queryFn: () => fetchAllConfirmOrderByEmail(email),
    refetchInterval: 10000,
  });

  
  return (
    <div className="my-5 px-5">
        <Helmet>
              <title>Dashboard-Orders-History</title>
            </Helmet>
      <PreBackButton title="Order History" /> <hr className="h-1 bg-primary" />
      <div className="relative overflow-x-auto  shadow-xs rounded-base mt-2">
        {data?.length === 0 ? (
          <h1 className="text-center p-5 font-bold">No Order History Found</h1>
        ) : (
          data?.map((order) => (
            <OrderHistoryRow key={order?._id} orders={order} />
          ))
        )}
      </div>


    </div>
  );
};

export default OrderHistory;
