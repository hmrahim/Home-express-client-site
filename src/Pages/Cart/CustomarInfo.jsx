import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GiHomeGarage } from "react-icons/gi";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import auth from "../../firebase.init";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PaperPlainLoader from "../Components/Loader/PaperPlainLoader";
import CustomerLocation from "../Dashboard/Customers-Dashboard/CustomerLocation";
import {
  confirmOrder,
  getAddressFromLocation,
  getUserByEmail,
  getUserLocation,
} from "../../api/AllApi";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";

const CustomarInfo = () => {
  const { email } = useContext(AuthContext);
  const [location, setLocation] = useState(null);
  const { data: address, isPending: addresPending } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: () => getUserLocation(location.lat, location.lng),
    refetchInterval: 1000,
  });

  const info = address?.data?.address;

  // console.log(location);
  const navigate = useNavigate();
  const user = useAuthState(auth);
  // const email = user[0]?.email;
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getUserByEmail", email],
    queryFn: () => getUserByEmail(email),
    refetchInterval: 1000,
  });

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
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Shipping address added successfully", {
          autoClose: 1000,
        });
        //  navigate("/cart/payment");
      }
    },
  });

  useEffect(() => {
    setValue("name", data?.data.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", data?.data.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("city", info?.city, { shouldValidate: true, shouldDirty: true });
    setValue("region", info?.state, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("building", info?.road, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("area", address?.data.display_name, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue]);
  const onSubmit = async (data) => {
    const info = { ...data, location: location };
    mutation.mutate(info);

    // const res = await axios.post(
    //   "https://server-site-psi-inky.vercel.app/api/confirm-order",
    //   {ll
    //     info,
    //   }
    // );
  };
  if (isPending) {
    return <PaperPlainLoader />;
  }

  return (
    <div className=" font-serif">
      <div className="flex flex-col md:flex-row justify-around  py-5 gap-5 ">
        <div className="bg-base-100 w-full md:px-5 rounded-lg  md:px-0">
          <h1 className="text-2xl text-center font-semibold mt-5">
            Order Information
          </h1>{" "}
          <hr className="h-1 bg-primary mb-3" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white py-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Full Name"
                    {...register("name")}
                  />

                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Full name
                  </label>
                </div>
                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="E-mail"
                    disabled="true"
                    {...register("email")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    E-mail
                  </label>
                </div>

                <div id="input" className="relative">
                  <input
                    type="Number"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Mobile Number"
                    {...register("number", {
                      required: {
                        value: true,
                        message: "Phone number is required",
                      },
                    })}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Mobile Number
                  </label>
                  {errors.number?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.number.message}
                    </span>
                  )}
                </div>
                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="City"
                    {...register("city")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    City
                  </label>
                  {/* {errors.city?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </span>
                  )} */}
                </div>
                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Region"
                    {...register("region")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Region
                  </label>
                  {/* {errors.region?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.region.message}
                    </span>
                  )} */}
                </div>

                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Building/ House No/ Floor/ Street"
                    {...register("building")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Street
                  </label>
                  {/* {errors.building?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.building.message}
                    </span>
                  )} */}
                </div>
                <div id="input" className="relative">
                  <input
                    type="text"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder="Area"
                    {...register("area")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Area
                  </label>
                  {/* {errors.area?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.area.message}
                    </span>
                  )} */}
                </div>

                <div id="input" className="relative">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                    placeholder=" Building/House No/ Floor/ "
                    {...register("address")}
                  />
                  <label
                    for="floating_outlined"
                    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Building/House No/ Floor (Optional)
                  </label>
                  {/* {errors.address?.type === "required" && (
                    <span className="mt-1 text-sm text-red-600">
                      {errors.address.message}
                    </span>
                  )} */}
                </div>
              </div>
              <div className="my-4">
                <label className="text-xl text-green-600 pb-2 font-bold">
                  Select Location
                </label>
              </div>
              <div>
                <CustomerLocation setLocation={setLocation} />
              </div>

              <div className="sm:flex sm:flex-row-reverse flex gap-4 mt-4">
                <button className="w-fit btn-primary rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border  transition-all duration-300">
                  <div className="flex gap-2 items-center">
                    {mutation.isPending ? "Saving" : "  Save changes"}
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
