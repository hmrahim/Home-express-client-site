import React, { useContext, useEffect, useState } from "react";
import { GiCash } from "react-icons/gi";
import { FaGooglePay } from "react-icons/fa";
import { FaApplePay } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  confirmedOrderWithPayment,
  confirmOrder,
  getDistanceApi,
} from "../../api/AllApi";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import OrderSummery from "./OrderSummery";
const Payment = () => {
  const navigate = useNavigate();
  const user = useAuthState(auth);
  // const [address, setAddress] = useState("");

  // const email = user[0]?.email;
  const { email, cart } = useContext(AuthContext);
  const deliveryFee =
    cart?.distence <= 5
      ? (15).toFixed(2)
      : (Number(cart?.distence) * 5).toFixed(2);
  const totalAmount = (cart?.totalAmount + Number(deliveryFee)).toFixed(2);
  // useEffect(() => {
  //   const data = localStorage.getItem("address");
  //   const parsData = JSON.parse(data);
  //   if (parsData) {
  //     setAddress(parsData);
  //   }
  // }, []);

  const { data, isPending } = useQuery({
    queryKey: ["getDistanceApi", email],
    queryFn: () => getDistanceApi(email),
    refetchInterval: 1000,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (items) => confirmedOrderWithPayment(items, email),
    onSuccess: (res) => {
      if (res.status === 200) {
        // navigate("/dashboard");
      }
    },
  });

  const onSubmit = (data) => {
    const items = {
      payment: data.payment,
      status: "pending",
      orderNo: "RF-" + Math.floor(Math.random() * 10000 * 10000 * 100),
      totalAmount: totalAmount,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "If your click on confirm button ! your order will be confirmed",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it",
    }).then((result) => {
      if (result.isConfirmed) {
        // const res = await axios.put(
        //   `https://server-site-psi-inky.vercel.app/api/confirm-order/${email}`,
        //   {
        //     items,
        //   }
        // );
        // if (res.status === 200) {
        //   navigate("/dashboard");
        // }

        mutation.mutate(items);

        Swal.fire({
          title: "Confirmed!",
          text: "Your order confirmed succesfully.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <div class="max-w-5xl mx-auto px-4 py-10">
        {/* <!-- Title --> */}
        <h1 class="text-3xl font-bold text-center  mb-4">
          Choose Payment Method
        </h1>
        <hr className="bg-white h-1 mb-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* <!-- LEFT SIDE --> */}
            <div class="lg:col-span-2 space-y-6">
              {/* <!-- Cash on Delivery --> */}
              <label class="block bg-white rounded-2xl shadow p-6 cursor-pointer border-2 border-green-500">
                <div class="flex items-center gap-4">
                  <input
                    {...register("payment", {
                      required: {
                        value: true,
                        message: "Payment method is required",
                      },
                    })}
                    type="radio"
                    class="accent-green-600 w-5 h-5"
                    value="cash"
                  />
                  <div>
                    <h2 class="text-lg font-semibold flex items-center gap-2">
                      Cash on Delivery
                      <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Cash on delivery
                      </span>
                    </h2>
                    <p class="text-sm text-gray-500">
                      Pay when your order is delivered to your doorstep
                    </p>
                  </div>
                </div>
              </label>

              {/* <!-- Card Payment --> */}
              <label class="block bg-white rounded-2xl shadow p-6 cursor-pointer hover:border-indigo-500 border-2 border-transparent">
                <div class="flex items-center gap-4">
                  <input
                    {...register("payment", {
                      required: {
                        value: true,
                        message: "Payment method is required",
                      },
                    })}
                    value="Card"
                    type="radio"
                    class="accent-indigo-600 w-5 h-5"
                    disabled
                  />
                  <div>
                    <h2 class="text-lg font-semibold">Debit / Credit Card</h2>
                    <p class="text-sm text-gray-500">
                      Visa, MasterCard, MadaCard
                    </p>
                  </div>
                </div>

                {/* <!-- Card Fields (UI Only) --> */}
                <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    disabled
                    type="text"
                    placeholder="Card Number"
                    class="border rounded-lg px-4 py-3 w-full"
                  />
                  <input
                    disabled
                    type="text"
                    placeholder="Card Holder Name"
                    class="border rounded-lg px-4 py-3 w-full"
                  />
                  <input
                    disabled
                    type="text"
                    placeholder="MM / YY"
                    class="border rounded-lg px-4 py-3 w-full"
                  />
                  <input
                    disabled
                    type="text"
                    placeholder="CVV"
                    class="border rounded-lg px-4 py-3 w-full"
                  />
                </div>
              </label>

              {/* <!-- Mobile Banking --> */}

              {/* <!-- Bank Transfer --> */}
            </div>

            {/* <!-- RIGHT SIDE --> */}
            <div class="bg-white  rounded-2xl shadow p-6 h-fit">
              <h2 class="text-xl font-semibold mb-2 text-black">
                Order Summary
              </h2>{" "}
              <hr className="mb-2" />
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span>{cart?.totalAmount.toFixed(2)}</span>
                </div>

                <div class="flex justify-between text-black">
                  <span>Distence</span>
                  <span>
                    {cart?.distence ? `${cart?.distence} km` : "0 km"}
                  </span>
                </div>
                <div class="flex justify-between text-black">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee}</span>
                </div>

                {/* <div class="flex justify-between text-green-600">
                  <span>Promo Discount</span>
                  <span>-৳200</span>
                </div> */}

                <hr />

                <div class="flex justify-between font-bold text-lg text-black">
                  <span>Total</span>
                  <span>{totalAmount} </span>
                </div>
              </div>
              <button class="mt-6 w-full btn bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl text-lg font-semibold transition">
                Confirm Payment
              </button>
              {errors.payment?.type === "required" && (
                <span className="mt-1 text-red-600">
                  {errors.payment.message}
                </span>
              )}
              <p class="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure
              </p>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;
