import React, { useState } from "react";
import "./ConfirmDelivery.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { updateConfirmOrderStatus } from "../../../api/AllApi";
import { useMutation } from "@tanstack/react-query";
const ConfirmDelivery = ({ total, order }) => {
  const deliveryFee =
    order?.distence <= 5
      ? (15).toFixed(2)
      : (Number(order?.distence) * 1).toFixed(2);
  const totalAmount = Number(deliveryFee) + Number(order?.totalAmount);
  const [isChecked, setIsChecked] = useState(false);
  const toggle = () => {
    if (isChecked === true) {
      setIsChecked(false);
    } else if (isChecked === false) {
      setIsChecked(true);
    }
  };
  const id = order?._id;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (data) =>
      updateConfirmOrderStatus(id, { ...data, totalAmount: total }),
  });

  const confirmDeliveryHandler = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes, Delivered!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(data);

        reset();
        Swal.fire({
          title: "Completed!",
          text: "Your order has been delivered.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className=" flex flex-col items-center p-10 rounded-lg">
      <form onSubmit={handleSubmit(confirmDeliveryHandler)}>
        <div className="container px-5 flex items-center justify-center gap-8">
          <div>
            <input
              {...register("status", { required: true })}
              onClick={toggle}
              checked={isChecked}
              style={{ display: "none" }}
              id="mute"
              type="checkbox"
              value="delivered"
            />
            <label className="check" for="mute">
              <svg viewBox="0 0 18 18" height="40px" width="40px">
                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
              </svg>
            </label>
          </div>
          <div>
            <strong
              className={`font-bold text-2xl font-serif ${
                isChecked ? "text-primary" : ""
              }`}
            >
              {totalAmount}
            </strong>{" "}
            <sub className="text-lg font-semibold">sr</sub>
          </div>
        </div>
        <div className="mt-10">
          <button
            disabled={isChecked ? false : true}
            className="btn btn-primary btn-sm"
          >
            {mutation.isLoading ? "Confirming..." : "Confirm Delivery"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDelivery;
