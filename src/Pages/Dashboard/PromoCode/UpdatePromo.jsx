import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import PreBackButton from "../../Components/PreBackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPromocodeById,
  postPromocode,
  updatePromoById,
} from "../../../api/AllApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdatePromo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { data, isPending } = useQuery({
    queryKey: ["getPromoById"],
    queryFn: () => getPromocodeById(id),

    refetchInterval: 1000,
  });

  const startDate = data?.startDate
    ? new Date(data?.startDate).toISOString().split("T")[0]
    : "";
  const endDate = data?.endDate
    ? new Date(data?.endDate).toISOString().split("T")[0]
    : "";

  const mutation = useMutation({
    mutationFn: (PromoData) => updatePromoById(PromoData, id),
    onSuccess: (res) => {
      console.log(res);
      if (res.status === 200) {
        toast.success("Promo code updated successfully", { autoClose: 1000 });
        navigate("/dashboard/all-promocode");
      }
    },
  });

  const onSubmit = (PromoData) => {
    mutation.mutate(PromoData);
  };
  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Update-Promo</title>
        </Helmet>
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Update Promos" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 px-2">
              {/* Code */}
              <div>
                <label className="block mb-1 font-medium">Code</label>
                <input
                  defaultValue={data?.code}
                  {...register("code", { required: "Code is required" })}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>

              {/* Discount Type */}
              <div>
                <label className="block mb-1 font-medium">Discount Type</label>
                <select
                  defaultValue={data?.discountType}
                  {...register("discountType", { required: true })}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              {/* Discount Value */}
              <div>
                <label className="block mb-1 font-medium">Discount Value</label>
                <input
                  defaultValue={data?.discountValue}
                  type="number"
                  {...register("discountValue", {
                    required: "Discount value is required",
                  })}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.discountValue && (
                  <p className="text-red-500 text-sm">
                    {errors.discountValue.message}
                  </p>
                )}
              </div>

              {/* Min Purchase Amount */}
              <div>
                <label className="block mb-1 font-medium">
                  Minimum Purchase Amount
                </label>
                <input
                  defaultValue={data?.minPurchaseAmount}
                  type="number"
                  {...register("minPurchaseAmount")}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Max Discount Amount */}
              <div>
                <label className="block mb-1 font-medium">
                  Maximum Discount Amount
                </label>
                <input
                  defaultValue={data?.maxDiscountAmount}
                  type="number"
                  {...register("maxDiscountAmount")}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Usage Limit */}
              <div>
                <label className="block mb-1 font-medium">Usage Limit</label>
                <input
                  defaultValue={data?.usageLimit}
                  type="number"
                  {...register("usageLimit")}
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Start & End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Start Date</label>
                  <input
                    defaultValue={startDate}
                    type="date"
                    {...register("startDate", { required: true })}
                    className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">End Date</label>
                  <input
                    defaultValue={endDate}
                    type="date"
                    {...register("endDate", { required: true })}
                    className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  defaultValue={data?.description}
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows="3"
                  className="w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Is Active */}
              <div className="flex items-center space-x-2">
                <input
                  defaultChecked={data?.isActive === true ? true : false}
                  type="checkbox"
                  {...register("isActive")}
                  className="h-5 w-5"
                />
                <label className="font-medium">Is Active</label>
              </div>

              {/* Applicable Users */}
              {/* Description */}
            </div>
            <div>
              <button
                type="submit"
                className="btn  bg-gradient-to-r from-green-500 to-emerald-600  text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Save Promocode
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdatePromo;
