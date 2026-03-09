import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { deleteOffer, updateOffer } from "../../../api/AllApi";
import { t } from "i18next";

const OfferRow = ({ offer }) => {
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteOffer(id),
    onSuccess: (res) => {
     toast.success("Offer deleted successfully");
    },
  });
  const updateMutation = useMutation({
    mutationFn: (data) => updateOffer(data),
    onSuccess: (res) => {
     toast.success("Offer updated successfully");
    },
  });


const controlStatus = (e)=> {
  const status = e.target.checked
  updateMutation.mutate({ id: offer._id, status });

}

  const deleteSingleOffer = (id) => {
    deleteMutation.mutate(id);
   
  };

  return (
    <tr key={offer._id} className="hover:bg-gray-50 transition">
      {/* Title */}

      <td className="px-6 py-4 font-medium text-gray-800">{offer.title}</td>

      {/* Amount */}

      <td className="px-6 py-4 text-gray-600">{offer.minAmount} SAR</td>

      {/* Status */}

      <td className="px-6 py-4">
        {offer.status ? (
          <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
            Inactive
          </span>
        )}
      </td>

      {/* Toggle */}

      <td className="px-6 py-4 text-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input checked={offer.status} onChange={controlStatus} type="checkbox" className="sr-only peer" />

          <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>

          <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full shadow-md transition peer-checked:translate-x-7"></div>
        </label>
      </td>
      <td className="px-6 py-4 font-medium text-gray-800 ">
        <button
          onClick={() => deleteSingleOffer(offer._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OfferRow;
