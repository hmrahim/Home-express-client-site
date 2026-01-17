import React from "react";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import PromoRow from "./PromoRow";
import { useQuery } from "@tanstack/react-query";
import { getPromocode } from "../../../api/AllApi";

const AllPromocode = () => {
  const { data, isPending } = useQuery({
    queryKey: ["getPromocode"],
    queryFn: getPromocode,
    refetchInterval:1000
  });

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-All-Promos</title>
        </Helmet>
        <div
          style={{ overflow: "scroll" }}
          className=" md:w-11/12 w-full   mx-auto py-5 bg-base-100 rounded-lg shadow-lg  border border-success"
        >
          <PreBackButton title="All Promos" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />

          <div className="overflow-x-auto bg-white mt-2 shadow">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                <tr className="bg-gradient-to-r from-green-500 to-emerald-600 text-base-100">
                  <th className="px-4 text-center">NO</th>
                  <th className="px-4 text-center">Code</th>
                  <th className="px-4 text-center">Description</th>
                  <th className="px-4 text-center">Discount Type</th>
                  <th className="px-4 text-center">Discount Value</th>
                  <th className="px-4 text-center">Min Purchase</th>
                  <th className="px-4 text-center">Max Discount</th>
                  <th className="px-4 text-center">Usage Limit</th>
                  <th className="px-4 text-center">Usage Count</th>
                  <th className="px-4 text-center">Start Date</th>
                  <th className="px-4 text-center">End Date</th>
                  <th className="px-4 text-center text-center">Active</th>
                  <th className="px-4 text-center text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {isPending ? (
                  <h1>Loading...</h1>
                ) : (
                  data?.map((promo,index) => (
                    <PromoRow key={promo._id} promo={promo} index={index} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPromocode;
