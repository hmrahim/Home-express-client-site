import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { IoCloseCircle } from "react-icons/io5";
import "./auth.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

import auth from "../../../firebase.init";
import axios from "axios";
import LoginClient from "./LoginClient";


const AuthClient = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const pathname = location.pathname;

  // const [useSendEmailVerification, sending, vError] =
  // useSendEmailVerification(auth);
  
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();



  const onSubmit = async (data) => {
   const result =  createUserWithEmailAndPassword(data.email, data.password);
   

    if (!error) {
      const res = await axios.post(
        "https://server-site-psi-inky.vercel.app/api/user",
        {
          name: data.name,
          email: data.email,
        }
      );
      toast.success("Registration sucesfully");
      reset()
    }

  
  };

  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box relative  h-screen bg-base-100">
          <label htmlFor="my_modal_6" className=" absolute right-0 top-0">
            <IoCloseCircle className="text-4xl cursor-pointer text-red-600" />
          </label>
          <Tabs>
            <TabList>
              <Tab>Login</Tab>
              <Tab>SignUp</Tab>
            </TabList>
           
            <TabPanel>
             <LoginClient/>
            </TabPanel>
            <TabPanel>
              <div className="max-w-lg w-full">
                <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden">
                  <div className="pb-8 shadow-2xl">
                    <h1 className=" text-center text-2xl text-gray-900 font-bold">
                      SignUp Form
                    </h1>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mt-8 space-y-6"
                    >
                      <div className="rounded-md shadow-sm">
                        <div>
                          <label className="sr-only" for="email">
                            Name
                          </label>
                          <input
                            placeholder="Name"
                            className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            required=""
                            autocomplete="email"
                            type="text"
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                            })}
                          />
                          <div className="flex">
                            {errors.name?.type === "required" && (
                              <span className="text-red-600">
                                {errors.name.message}
                              </span>
                            )}
                           
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="sr-only" for="email">
                            Email address
                          </label>
                          <input
                            placeholder="Email address"
                            className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            required=""
                            autocomplete="email"
                            type="email"
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
                          <div className="flex">
                            {errors.email?.type === "required" && (
                              <span className="text-red-600">
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
                            required=""
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
                              <span className="text-red-600">
                                {error.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <input
                            className="h-4 w-4 text-primary focus:ring-primary border-primary rounded"
                            type="checkbox"
                            name="remember-me"
                            id="remember-me"
                          />
                          <label
                            className="ml-2 block text-sm text-gray-400"
                            for="remember-me"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div>
                        <button
                          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-800  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          type="submit"
                        >
                          {
                            loading ? <span className="loading loading-bars loading-sm"></span> : 
                          "Sign Up"
                          }
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="px-8 py-4 bg-gray-700 text-center">
                    <span className="text-gray-400">Sign Up From Here</span>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>

          {/* //    <!-- From Uiverse.io by iZOXVL --> */}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AuthClient;
