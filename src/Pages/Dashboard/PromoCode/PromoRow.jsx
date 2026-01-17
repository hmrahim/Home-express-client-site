import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { deletePromo } from "../../../api/AllApi";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const PromoRow = ({ promo,index }) => {
  const startDate = new Date(promo.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const endDate = new Date(promo.endDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const mutation = useMutation({
    mutationFn: () => deletePromo(promo._id),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Promo deleted succesfully", { autoClose: 1000 });
      }
    },
  });


  const deletePromos = ()=> {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
        mutation.mutate()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });

  }
  return (
    <tr className="hover:bg-gradient-to-l from-gray-600 to-gray-800 hover:text-base-100 transform transition-all">
      <td className="px-4  font-medium">{index +1}</td>
      <td className="px-4  font-medium">{promo.code}</td>
      <td className="px-4 text-center">{promo.description}</td>
      <td className="px-4 text-center">{promo.discountType}</td>
      <td className="px-4 text-center">{promo.discountValue}</td>
      <td className="px-4 text-center">{promo.minPurchaseAmount}</td>
      <td className="px-4 text-center">{promo.maxDiscountAmount}</td>
      <td className="px-4 text-center">{promo.usageLimit}</td>
      <td className="px-4 text-center">{promo.usedCount}</td>
      <td className="px-4 text-center">{startDate}</td>
      <td className="px-4 text-center">{endDate}</td>

      <td className="px-4 py-3 text-center">
        {promo.isActive === true ? (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-red-600">
            Inactive
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-center flex gap-2">
        <Link
          to={`/dashboard/update-promo/${promo._id}`}
          className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600"
        >
          Edit
        </Link>
        <button
          onClick={deletePromos}
          className="px-2 btn btn-xs py-1 text-xs font-semibold rounded-full bg-green-100 text-red-600"
        >
          Delete
        </button>
      </td>
      <ToastContainer />
    </tr>
  );
};

export default PromoRow;
