import axios from "axios";
import React, { useState } from "react";
import { GoTrash } from "react-icons/go";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ToolTop from "../Components/ToolTip/ToolTop";
import { useMutation } from "@tanstack/react-query";
import { deleteCartItems, updateCartQty } from "../../api/AllApi";

const CartList = ({ cart, refetch }) => {
  const discountPrice = (Number(cart.price) * Number(cart.discount)) / 100;
  const minQty = cart?.minQty;

  const [count, setCount] = useState(cart.quantity);

  const mutation = useMutation({
    mutationKey: ["updateCartQty"],
    mutationFn: (quantity) => updateCartQty(cart._id, quantity),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Quantity Updated", { autoClose: 1000 });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteCart", cart._id],
    mutationFn: (id) => deleteCartItems(id),
  });

  const qty = Number(count);
  const incress = async (id) => {
    if (qty <= 0) {
      return false;
    } else {
      setCount(qty + 1);
    }

    const quantity = { quantity: Number(count) + 1 };
    mutation.mutate(quantity);
  };
  const decress = async (id) => {
    if (qty <= minQty) {
      return false;
    } else {
      setCount(qty - 1);
    }

    const quantity = { quantity: Number(count) - 1 };
    mutation.mutate(quantity);
  };
  const deleteCart = (id) => {
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
        deleteMutation.mutate(id);

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

  refetch();
  return (
    <tr className="">
      <td className="text-center">
        <div>
          <img className="size-10 rounded-box" src={cart.image} />
        </div>
      </td>
      <td className="text-center">
        <div>
          <h1 className="">{truncate(cart.name, 15)}</h1>
        </div>
      </td>
      <td className="text-center ">
        <div className="relative border-primary border flex flex-row flex-row-reverse justify-center items-center w-fit px-2 rounded-lg">
          <h3 className="text-xl font-bold ">
            {cart.discount ? cart.price - discountPrice : cart.price}
            <sub className="text-xs">sr</sub>
          </h3>
          {cart.discount ? (
            <p className="text-gray-500">
              <del> {cart.price}</del>
              <sub></sub>
            </p>
          ) : (
            ""
          )}
          {cart.discount ? <ToolTop discount={cart.discount} /> : ""}
        </div>
      </td>
      <td className="text-center">
        <div className="w-32 rounded-xl  flex gap-2 ">
          <button
            onClick={() => decress(cart._id)}
            className="btn btn-xs btn-square shadow-xl  bg-gradient-to-r from-green-500 to-emerald-600 text-base-100 font-bold"
          >
            -
          </button>
          <input
            type=""
            disabled
            value={count}
            className="text-center h-6 w-4  bg-transparent"
          />
          <button
            onClick={() => incress(cart._id)}
            className="btn btn-xs btn-square shadow-xl   bg-gradient-to-r from-green-500 to-emerald-600 text-base-100 font-bold"
          >
            +
          </button>
        </div>
      </td>
      <td className="text-center">
        <h1 className="font-bold text-lg">
          {cart.discount
            ? cart.price * cart.quantity - discountPrice * Number(cart.quantity)
            : Number(cart.price) * Number(cart.quantity)}
          <sub>sr</sub>
        </h1>
      </td>
      <td className="text-center">
        <button className="btn btn-sm">
          <GoTrash
            className="text-red-600 font-bold cursor-pointer"
            onClick={() => deleteCart(cart._id)}
          />
        </button>
      </td>
      <ToastContainer />
    </tr>
  );
};

export default CartList;
