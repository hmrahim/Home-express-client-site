import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { gettOffer,deleteOffer } from "../../../api/AllApi";
import OfferRow from "./OfferRow";

const AllOffer = () => {
  const { register, watch } = useForm({
    defaultValues: {
      offers: [
        { id: 1, title: "Free Delivery Offer", amount: 200, active: true },
        { id: 2, title: "Weekend Delivery Offer", amount: 300, active: false },
      ],
    },
  });

  const offers = watch("offers");

  const { data, isLoading } = useQuery({
    queryKey: ["getOffer"],
    queryFn: gettOffer,
    refetchInterval: 1000,
  });

  
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="bg-white shadow-xl rounded-2xl border overflow-hidden">
        {/* Header */}

        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-white">
          <h2 className="text-2xl font-bold text-gray-800">Offer Management</h2>
          <p className="text-sm text-gray-500">
            Activate or deactivate delivery offers
          </p>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Minimum Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Control</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data?.map((offer, index) => <OfferRow key={offer._id} offer={offer} index={index} /> )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOffer;
