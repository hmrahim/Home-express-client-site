import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteCategoryById } from "../../../api/AllApi";

const CategoryRow = ({ index, items, refetch }) => {

    const mutation = useMutation({
    mutationKey: ["deleteCategoryById"],
    mutationFn: (id) => deleteCategoryById(id),
  });
  const deleteCategory = async (id) => {
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
        mutation.mutate(id)
        // axios.delete(`https://server-site-psi-inky.vercel.app/api/category/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  refetch()
  return (
    <tr className="bg-base-200 text-center">
      <th>{index + 1}</th>
      <td>{items.name}</td>
      <td className="flex gap-3 justify-center items-center">
        <Link
          to={`/dashboard/update-category/${items._id}`}
          className="btn btn-xs btn-primary"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteCategory(items._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
