import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProducts } from "../../../api/AllApi";

const ProductRow = ({ product, index }) => {
  const id = product._id;

  const muation = useMutation({
    mutationKey: ["deleteProducts"],
    mutationFn: (id) => deleteProducts(id),
  });
  const deleteProduct = (id) => {
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
        muation.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  return (
    <tr>
      <td className="text-center">{index + 1}</td>
      <td className="text-center">{product.name}</td>
      <td className="text-center">{product.category}</td>
      <td className="text-center">{product.brand}</td>
      <td className="text-center">{product.country}</td>
      <td className="text-center">SAR {product.price}</td>
      <td className="text-center">
        <span
          className={
            product.discount
              ? "bg-primary px-2 py-1 rounded-md text-white animate-pulse "
              : "bg-error px-2 py-1 rounded-md text-white"
          }
        >
          {product.discount ? product.discount + "%" : "No Discount"}
        </span>
      </td>
      <td className="text-center text-justify">{truncate(product.desc, 20)}</td>
      <td className="text-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={product.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
        </div>
      </td>
      <th className="flex gap-5">
        <Link
          to={`/dashboard/update-product/${product._id}`}
          className="btn btn-xs btn-primary"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteProduct(product._id)}
          className="btn btn-xs btn-error"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default ProductRow;
