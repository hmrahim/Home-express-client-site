import React from "react";
import google from "../../../assets/google.png";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
    if (user) {
      toast.success("Sign in succesfully");
      navigate(from, { replace: true });
    }
  };
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const googleSignIn = () => {
    signInWithGoogle();
    if (gUser) {
      toast.success("Login Successful");
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
              {error && <span className="text-red-600">{error.message}</span>}
            </fieldset>
            <div className="flex flex-col">
              <p className="text-white">
                Dont have any account?{" "}
                <Link to="/signup" className="text-blue-400">
                  Register
                </Link>
              </p>
              <Link to="/resetpass" className="text-white mb-2">
                Forgot Password
              </Link>
              <button className="btn btn-neutral">
                {loading ? (
                  <span className="loading loading-bars loading-md">
                    Loading...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <button onClick={googleSignIn} className="btn btn-neutral my-3">
            <img src={google} className="h-6 w-6" alt="" />
            {gLoading ? (
              <span className="loading loading-bars loading-md">
                Loading...
              </span>
            ) : (
              "Login with google"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
