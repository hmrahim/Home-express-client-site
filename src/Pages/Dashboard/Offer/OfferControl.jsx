import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaGift } from "react-icons/fa";
import PreBackButton from "../../Components/PreBackButton";
import { useMutation } from "@tanstack/react-query";
import { postOffer } from "../../../api/AllApi";
import { toast } from "react-toastify";

const OfferControl = () => {

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: "Free Delivery Offer",
      minAmount: 200,
      active: true,
    },
  });

  const active = watch("active");


const mutation = useMutation({
    mutationFn: (offer) => postOffer(offer),
    onSuccess:(res)=> {
        if(res.status === 200) {
          toast.success("Offer created successfully")
        }
    }

})

  const onSubmit = (data) => {
    mutation.mutate(data)

  };

  return (
    <div>
         <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
           <Helmet>
             <title>Dashboard-Create-Offer</title>
           </Helmet>
           <div className="  md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
             <PreBackButton title="Create Offer" />
             <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
      <div className="bg-gradient-to-br from-white to-green-50 shadow-xl border rounded-2xl p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaGift className="text-3xl text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Offer Control Panel
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Offer Title */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Offer Title
            </label>

            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Free Delivery Offer"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Minimum Amount */}
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Minimum Order Amount (SAR)
            </label>

            <input
              {...register("minAmount", { required: true })}
              type="number"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Toggle Switch */}

          <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm">

            <span className="font-medium text-gray-700">
              Activate Offer
            </span>

            <label className="relative inline-flex items-center cursor-pointer">

              <input
                type="checkbox"
                {...register("status")}
                className="sr-only peer"
              />

              <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>

              <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition peer-checked:translate-x-7"></div>

            </label>

          </div>

          {/* Status Text */}

          <div className="text-sm">
            {active ? (
              <span className="text-green-600 font-semibold">
                Offer is Active
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                Offer is Inactive
              </span>
            )}
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {mutation.isPending ? "Saving..." : "Save Offer"}
           
          </button>

        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OfferControl;