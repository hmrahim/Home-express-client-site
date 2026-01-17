import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GiHomeGarage } from "react-icons/gi";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import auth from "../../firebase.init";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PaperPlainLoader from "../Components/Loader/PaperPlainLoader";
import CustomerLocation from "../Dashboard/Customers-Dashboard/CustomerLocation";
import { FaShippingFast, FaWhatsapp } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import {
  confirmOrder,
  getAddressFromLocation,
  getUserByEmail,
  getUserLocation,
} from "../../api/AllApi";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";

const CustomarInfo = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggle = () => {
    if (isChecked === true) {
      setIsChecked(false);
    } else if (isChecked === false) {
      setIsChecked(true);
    }
  };

  const { email } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const { data: address, isPending: addresPending } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: () => getUserLocation(location.lat, location.lng),
    refetchInterval: 1000,
  });

  const info = address?.data;
  // console.log(address);

  // console.log(location);
  const navigate = useNavigate();
  const user = useAuthState(auth);
  // const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getUserByEmail", email],
    queryFn: () => getUserByEmail(email),
    refetchInterval: 1000,
  });

  const name = data?.data.name;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const mutation = useMutation({
    mutationKey: ["confirmOrder"],
    mutationFn: (info) => confirmOrder(info),
  });

  // useEffect(() => {
  //   setValue("name", data?.data.name, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   });
  //   setValue("email", data?.data.email, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   });
  //   setValue("city", info?.city, { shouldValidate: true, shouldDirty: true });
  //   setValue("region", info?.state, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   });
  //   setValue("building", info?.road, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   });
  //   setValue("area", address?.data.display_name, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //   });
  // }, [setValue]);

  const onSubmit = async (data) => {
    const info = {
      ...data,
      email: email,
      name: name,
      location: location,
      address: address?.data.address,
    };
    mutation.mutate(info);

    //  localStorage.setItem("address", JSON.stringify(info));
    //  const isSaved = localStorage.getItem("address")

    // if (isSaved) {
    //   navigate("/cart/payment");
    // }
    // console.log(info);
  };
  if (isPending) {
    return <PaperPlainLoader />;
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-around  gap-5 ">
        <div className="bg-base-100 w-full md:px-5 rounded-lg px-4  md:px-0 ">
          <h1 className="text-2xl text-center text-gray-950 font-semibold mt-5">
            Shipping Information
          </h1>{" "}
          <hr className="h-1 bg-primary mb-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white py-4 text-gray-800">
              <div className=" flex flex-col justify-center">
                <div>
                  <div className="bg-base-200 mb-4 rounded-2xl shadow p-4 ">
                    {/* <!-- Header --> */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Customer Information
                      </h2>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Verified
                      </span>
                    </div>

                    {/* <!-- Info List --> */}
                    <div className="space-y-2 grid grid-cols-1 md:grid-cols-2  ">
                      {/* <!-- Name --> */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                          N
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="text-base font-medium text-gray-800">
                            {data?.data.name}
                          </p>
                        </div>
                      </div>

                      {/* <!-- Email --> */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          <MdAttachEmail />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email Address</p>
                          <p className="text-base font-medium text-gray-800">
                            {email && email}
                          </p>
                        </div>
                      </div>

                      {/* <!-- Phone --> */}

                      {/* <!-- Address --> */}
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
                          <FaShippingFast />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Shipping Address</p>
                          {info?.address === undefined ? (
                            <p>Loading...</p>
                          ) : (
                            <p className="text-base font-medium text-gray-800 leading-relaxed">
                              {info?.address.road}, {info?.address.suburb},{" "}
                              {info?.address.postcode}, {info?.address.state},{" "}
                              {info?.address.city}, {info?.address.country}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-3 w-full">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">
                          <FaWhatsapp />
                        </div>
                        <div>
                          <input
                            {...register("phone", {
                              required: {
                                value: true,
                                message: "Phone number is required",
                              },
                              minLength: {
                                value: 10,
                                message: "Please provide a valid phone number",
                              },
                              maxLength: {
                                value: 10,
                                message: "You cant provide more then 10 digit",
                              },
                            })}
                            type="Number"
                            placeholder="Phone"
                            className="w-full input border-1 border-gray-300 "
                          />
                          {errors.phone?.type === "required" && (
                            <span className="text-red-600">
                              {errors.phone.message}
                            </span>
                          )}
                          {errors.phone?.type === "minLength" && (
                            <span className="text-red-600">
                              {errors.phone.message}
                            </span>
                          )}
                          {errors.phone?.type === "maxLength" && (
                            <span className="text-red-600">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-3 flex-col mt-5 ">
                        <div className="flex  gap-2 items-center">
                          <label className="text-white">
                            <input
                              checked={isChecked}
                              onClick={toggle}
                              className="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:hover:scale-110 dark:checked:scale-100 w-6 h-6"
                              type="checkbox"
                            />
                          </label>
                          <h1 className="font-semibold">Add Custom Address</h1>
                        </div>
                        <div
                          className={`${isChecked === false ? "hidden" : ""}`}
                        >
                          <div className=" ">
                            <fieldset className="fieldset">
                              <textarea
                                {...register("customAddress")}
                                className="textarea h-24 w-full broder-1 border-gray-400"
                                placeholder="Add Your information"
                              ></textarea>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <label className="text-xl text-green-600 pb-2 font-bold">
                    Select Location
                  </label>
                </div>
                <CustomerLocation setLocation={setLocation} />
              </div>

              <div className="sm:flex sm:flex-row-reverse flex gap-4 mt-4">
                <button className="w-fit btn-primary rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border  transition-all duration-300">
                  <div className="flex gap-2 items-center">
                    {mutation.isPending ? "Saving..." : "  Save changes"}
                  </div>
                </button>
              </div>
              {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomarInfo;
