import React from "react";
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
const Payment = () => {
  const navigate = useNavigate()
  const user = useAuthState(auth);
  const email = user[0]?.email;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const items = { payment: data.payment, status: "pending" };

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
      const res =  await axios.put(`https://server-site-psi-inky.vercel.app/api/confirm-order/${email}`, {
          items,
        });
        if(res.status === 200){
          navigate("/dashboard")
          
        }

        Swal.fire({
          title: "Confirmed!",
          text: "Your order confirmed succesfully.",
          icon: "success",
        });
      }
    });

    // if(res.status === 200){
    //   toast.success("Your order is confirmed")
    // }
  };
  return (
    <div>
      {/* <!-- Payment Section --> */}
      <section className="bpy-20 px-6">
        <div className=" flex justify-center items-center flex-col md:flex-row lg:flex-row">
          {/* <!-- Checkout Form --> */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Details
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Name on Card
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="Holder Name"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Card Number
                </label>
                <input
                  disabled
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-1 text-sm text-gray-600">
                    Expiry
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-1 text-sm text-gray-600">
                    CVC
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="123"
                    className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* <!-- Payment Methods & Summary --> */}
          {/* <!-- From Uiverse.io by SmookyDev -->  */}
          <div className="w-[300px] p-2 py-5 aspect-square rounded-lg shadow flex flex-col items-center justify-center gap-2 bg-slate-50  text-black">
            <h1 className="capitalize text-2xl font-semibold self-start">
              {" "}
              Payment method
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="inline-flex justify-between w-full items-center z-10 rounded-lg p-2 border border-transparent has-[:checked]:border-primary  has-[:checked]:text-primary has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                <div className="inline-flex items-center justify-center gap-2 relative z-10">
                  <FaGooglePay className="text-4xl" />
                  <p className="font-semibold absolute inset-0 w-full whitespace-nowrap  translate-x-full top-1 left-2 transition-all duration-700 ">
                    Google Pay
                  </p>
                </div>
                <input
                  className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                  value="google"
                  name="payment"
                  type="radio"
                  disabled
                  {...register("payment", { required: true })}
                />
              </label>
              <label className="inline-flex justify-between w-full items-center rounded-lg p-2 border border-transparent has-[:checked]:border-primary  has-[:checked]:text-primary has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                <div className="inline-flex items-center justify-center gap-2 relative">
                  <FaApplePay className="text-4xl" />
                  <p className="font-semibold absolute inset-0 w-full whitespace-nowrap  translate-x-full top-1 left-2 transition-all duration-700">
                    Apple Pay
                  </p>
                </div>
                <input
                  className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                  value="apple"
                  name="payment"
                  type="radio"
                  disabled
                />
              </label>

              <label className="inline-flex justify-between w-full items-center rounded-lg p-2 border border-transparenthas-[:checked]:border-primary  has-[:checked]:text-primary has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                <div className="inline-flex items-center justify-center gap-2 relative">
                  <FaCcVisa className="text-4xl" />
                  <p className="font-semibold absolute inset-0 w-full whitespace-nowrap  translate-x-full top-1 ml-2 transition-all duration-700 ">
                    Credit Card
                  </p>
                </div>
                <input
                  className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                  value="visa"
                  name="payment"
                  type="radio"
                  disabled
                  {...register("payment", { required: true })}
                />
              </label>
              <label className="inline-flex justify-between w-full items-center rounded-lg p-2 border border-transparent has-[:checked]:border-primary  has-[:checked]:text-primary has-[:checked]:bg-indigo-50 has-[:checked]:font-bold hover:bg-slate-200 transition-all cursor-pointer has-[:checked]:transition-all has-[:checked]:duration-500 duration-500 relative [&amp;_p]:has-[:checked]:translate-y-0 [&amp;_p]:has-[:checked]:transition-transform [&amp;_p]:has-[:checked]:duration-500 [&amp;_p]:has-[:checked]:opacity-100 overflow-hidden">
                <div className="inline-flex items-center justify-center gap-2 relative">
                  <GiCash className="text-2xl" />

                  <p className="font-semibold ml-2 absolute inset-0 w-full whitespace-nowrap translate-x-full  transition-all duration-700 ">
                    Cash On Delivery
                  </p>
                </div>
                <input
                  className="checked:text-indigo-500 checked:ring-0 checked:ring-current focus:ring-0 focus:ring-current"
                  value="cash"
                  name="payment"
                  type="radio"
                  {...register("payment", { required: true })}
                />
              </label>
              <button className="w-full mt-4 bg-primary hover:bg-green-700 text-white text-lg py-3 rounded-lg transition">
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Payment;
