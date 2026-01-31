import React from "react";
import { Link } from "react-router-dom";
import { deleteBanner } from "../../../api/AllApi";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const BannerRow = ({ data }) => {
  const id = data?._id;

  const mutation = useMutation({
    mutationFn: () => deleteBanner(id),
  });

  const deleteBanners = () => {
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
        mutation.mutate();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <tr class="hover:bg-gray-50 transition">
      <td class="px-6 py-4">
        <img
          src={data?.image}
          class="w-28 h-14 object-cover rounded-lg border"
        />
      </td>

      <td class="px-6 py-4 font-medium text-gray-800">{data?.title}</td>

      <td class="px-6 py-4 text-gray-500 max-w-xs truncate">{data?.desc}</td>

      <td class="px-6 py-4 text-gray-500">28 Jan 2026</td>

      <td class="px-6 py-4">
        <div class="flex items-center justify-center gap-3">
          <Link
            to={`/dashboard/update-banner/${data?._id}`}
            class="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit
          </Link>

          <button
            onClick={deleteBanners}
            class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BannerRow;
