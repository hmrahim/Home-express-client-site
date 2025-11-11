import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../firebase.init";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
   
  const [sendEmailVerification, sending, vError] =
    useSendEmailVerification(auth);

  const onSubmit = async (data) => {
   
    createUserWithEmailAndPassword(data.email, data.password);

    if (error) {
      toast.error(error?.message);
    } else {
      const success = await sendEmailVerification();
      if (success) {
        toast.success("Verification Email Sent to your email address");
       
      }
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen bg-gray-400 px-5 md:px-0">
      <div
        className=" bg-primary md:w-2/5 w-full mx-auto px-5 py-5 mx-5 rounded-lg
              shadow-2xl "
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Home Express
        </h1>
        <hr className="my-2 h-5" />
        <div className="flex flex-col gap-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-white">
                Enter Your Name
              </legend>
              <input
                type="text"
                className="input w-full "
                placeholder="Type here"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name?.type === "required" && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
              {error && <span className="text-red-600">{error.message}</span>}
            </fieldset>
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-white">
                Enter Your Password
              </legend>
              <input
                type="text"
                className="input w-full "
                placeholder="Type here"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </fieldset>
            <div className="flex flex-col">
              <p className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400">
                  Login
                </Link>
              </p>

              <button className="btn btn-neutral mt-5">
                {loading ? (
                  <span className="loading loading-bars loading-md"></span>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
