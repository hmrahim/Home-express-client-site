import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LoginClient = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const location = useLocation();
  const pathname = location.pathname;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    if (!error) {
      toast.success("Sign in succesfully", {
        autoClose: 1000,
      });

      reset();
    }
  };

  return (
    <div className="max-w-lg w-full">
      <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
        <div className="pb-8 shadow-2xl">
          <h1 className=" text-center text-2xl text-gray-900 font-bold">
            Login Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" for="email">
                  Email address
                </label>
                <input
                  placeholder="Email address"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

                <div className="flex ">
                  {errors.email?.type === "required" && (
                    <span className="text-red-600 text-left">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-red-600 text-left">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label className="sr-only" for="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  autocomplete="current-password"
                  type="password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />

                <div className="flex">
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                  {error && (
                    <span className="text-red-600">{error.message}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                />
                <label
                  className="ml-2 block text-sm text-gray-400"
                  for="remember-me"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  className="font-medium text-indigo-500 hover:text-indigo-400"
                  href="#"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-700 text-center">
          <span className="text-gray-400">Login From Here</span>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
