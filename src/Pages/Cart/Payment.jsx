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
  stripePayment,
} from "../../api/AllApi";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import OrderSummery from "./OrderSummery";
import ViewShippingAddress from "./ViewShippingAddress";
// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   CardElement,
// } from "@stripe/react-stripe-js";
// import { stripePromise } from "../../../stripePromise";

const Payment = () => {
  const navigate = useNavigate();
  const user = useAuthState(auth);
  // const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // const email = user[0]?.email;
  const { email, cart } = useContext(AuthContext);
  const deliveryFee =
    cart?.distence <= 5
      ? (15).toFixed(2)
      : (Number(cart?.distence) * 1).toFixed(2);
  const totalAmount = (cart?.totalAmount + Number(deliveryFee)).toFixed(2);

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
        navigate("/dashboard");
      }
    },
  });
  const stripeMutation = useMutation({
    mutationFn: (totalAmount) => stripePayment(totalAmount),
  });

  const [transId, setTransId] = useState("");

  const onSubmit = async (data) => {
    const items = {
      payment: data.payment,
      status: "pending",
      orderNo: "RF-" + Math.floor(Math.random() * 10000 * 10000 * 100),
      totalAmount: totalAmount,
      tId: transId || "",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "If your click on confirm button ! your order will be confirmed",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (data.payment === "card") {
          stripeMutation.mutate({ amount: totalAmount });
          const res = stripeMutation.data;

          const clientSecret = res?.data?.clientSecret;

          const cardElement = elements.getElement(CardNumberElement);
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: email,
                },
              },
            },
          );
          


          if (paymentIntent.status === "succeeded") {
            setTransId(paymentIntent.id);
            toast.success("Payment complete successfuly", { autoClose: 1000 });
           
          }
        }

        mutation.mutate(items);

        Swal.fire({
          title: "Confirmed!",
          text: "Your order confirmed succesfully.",
          icon: "success",
        });
      }
    });
  };

  const CARD_STYLE = {
    style: {
      base: {
        color: "#111827", // Text color
        fontSize: "16px",
        fontFamily: "Inter, system-ui, sans-serif",
        "::placeholder": {
          color: "#9ca3af", // Placeholder color
        },
      },
      invalid: {
        color: "#dc2626", // Error color
        iconColor: "#dc2626",
      },
    },
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center  mb-4">
          Choose Payment Method
        </h1>
        <hr className="bg-white h-1 mb-4" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <label className="block bg-white rounded-2xl shadow p-6 cursor-pointer border-2 border-green-500">
                <div className="flex items-center gap-4">
                  <input
                    {...register("payment", {
                      required: {
                        value: true,
                        message: "Payment method is required",
                      },
                    })}
                    type="radio"
                    className="accent-green-600 w-5 h-5"
                    value="cash"
                  />
                  <div>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      Cash on Delivery
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Cash on delivery
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500">
                      Pay when your order is delivered to your doorstep
                    </p>
                  </div>
                </div>
              </label>

              <label className="block bg-white rounded-2xl shadow p-6 cursor-pointer hover:border-indigo-500 border-2 border-transparent">
                <div className="flex items-center gap-4">
                  <input
                  disabled
                    {...register("payment", {
                      required: {
                        value: true,
                        message: "Payment method is required",
                      },
                    })}
                    value="card"
                    type="radio"
                    className="accent-indigo-600 w-5 h-5"
                  />
                  <div className="w-full mb-3">
                    <h2 className="text-lg font-semibold">Debit / Credit Card</h2>
                    <p className="text-sm text-indigo-600 ">
                      Visa, Master Card, MadaCard
                    </p>
                    <hr className="h-1 bg-indigo-600" />
                  </div>
                </div>

                <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl ">
                  <label className="block text-gray-700 font-medium mb-1">
                    Card Number
                  </label>
                  <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                    <CardNumberElement options={CARD_STYLE} />
                  </div>

                  <div className="flex gap-4 p-2">
                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        Expiry Date
                      </label>
                      <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                        <CardExpiryElement options={CARD_STYLE} />
                      </div>
                    </div>

                    <div className="flex-1">
                      <label className="block text-gray-700 font-medium mb-1">
                        CVC
                      </label>
                      <div className="border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition">
                        <CardCvcElement options={CARD_STYLE} />
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div className="bg-white  rounded-2xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-2 text-black">
                Order Summary
              </h2>{" "}
              <hr className="mb-2" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-black">
                  <span>Subtotal</span>
                  <span>{cart?.totalAmount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-black">
                  <span>Distence</span>
                  <span>
                    {cart?.distence ? `${cart?.distence} km` : "0 km"}
                  </span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg text-black">
                  <span>Total</span>
                  <span>{totalAmount} </span>
                </div>
              </div>
              <button className="mt-6 w-full btn bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl text-lg font-semibold transition">
                Confirm Payment
              </button>
              {errors.payment?.type === "required" && (
                <span className="mt-1 text-red-600">
                  {errors.payment.message}
                </span>
              )}
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure
              </p>
            </div>
          </div>
          <ViewShippingAddress isPending={isPending} data={data} />
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;
