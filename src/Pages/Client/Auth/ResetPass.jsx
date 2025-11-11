import React from "react";
import google from "../../../assets/google.png";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

const ResetPass = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  

  const onSubmit = async (data) => {
    const success = await sendPasswordResetEmail(data.email);

    if (error) {
      toast.error(error?.message);
    } else {
      toast.success("Password Reset Email Sent to your email address");
  
     reset();
    }
  };

  
  return (
    <div className=" flex justify-center items-center h-screen bg-gray-400 px-5 md:px-0">
      <div
        className=" bg-primary md:w-2/5 w-full mx-auto px-5 py-5 mx-5 rounded-lg
      shadow-2xl "
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h1>
        <hr className="my-2 h-5" />
        <div className="flex flex-col gap-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-white">
                Enter Your Email
              </legend>
              <input
                type="text"
                className="input w-full "
                placeholder="Type here"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Please provide a valid email address",
                  },
                })}
              />
              {errors.email?.type === "required" && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </fieldset>

            <div className="flex flex-col mt-5">
              <button className="btn btn-neutral">
                {sending ? "Sending..." : " Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPass;
