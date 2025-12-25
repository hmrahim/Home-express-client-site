import React, { useState } from "react";
import PreBackButton from "../Components/PreBackButton";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSettingsData, postSettingsData } from "../../api/AllApi";
import { toast, ToastContainer } from "react-toastify";

const Settings = () => {
  const imgbbKey = "765622b71bed5a179efe4bce6d1d53c8";

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  console.log(preview);
  console.log(error);

  const handleChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
    // console.log("FILE:", files);

    if (!files) return;
    if (files.size > 1024 * 500) {
      setError("Image size must be less then 100 kb and file must be an image");
      e.target.value = null;
    } else {
      const imageUrl = URL.createObjectURL(files);

      setError("");
      setPreview(imageUrl);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationKey: ["postSettingsData"],
    mutationFn: (formData) => postSettingsData(formData),
  });

  const { data, isPending } = useQuery({
    queryKey: ["getSettingsData"],
    queryFn: getSettingsData,
    refetchInterval: 10000,
  });
  // const deleteUrl = data?.logo.deleteUrl;

  const onSubmit = async (data) => {
    const formData = new FormData();
    // const file = data?.image[0];
    formData.append("image", file);
    formData.append("websiteName", data.websiteName);
    formData.append("email", data.email);
    formData.append("copyright", data.copyright);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("twitter", data.twitter);
    formData.append("about", data.about);
    formData.append("address", data.address);
    formData.append("phone", data.phone);

    mutation.mutate(formData);
    if (mutation?.data?.status === 200) {
      toast.success("Settings Updated ", {
        autoClose: 1000,
       
      });
    }
  };

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0">
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Home Settings" />{" "}
          <hr className="h-1 bg-primary" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2 my-5">
              <div>
                <label
                  className="block mb-2.5 text-sm font-medium text-heading"
                  defaultdefaultValue={data?.websiteName}
                >
                  Website Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Website Name"
                  defaultValue={data?.websiteName}
                  {...register("websiteName", {
                    required: {
                      value: true,
                      message: "Website name is required",
                    },
                  })}
                />
                {errors.websiteName?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.websiteName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Email
                </label>
                <input
                  defaultValue={data?.email}
                  type="email"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                />
                {errors.email?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  for="company"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Facebook Url
                </label>
                <input
                  defaultValue={data?.socialLinks.facebook}
                  type="url"
                  id="company"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Facebook Url"
                  {...register("facebook", {
                    required: {
                      value: true,
                      message: "Facebook url is required",
                    },
                  })}
                />
                {errors.facebook?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.facebook.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Instagram Url
                </label>
                <input
                  defaultValue={data?.socialLinks.instagram}
                  type="url"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Instagram url"
                  {...register("instagram", {
                    required: {
                      value: true,
                      message: "Instagram url is required",
                    },
                  })}
                />
                {errors.instagram?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.instagram.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Twitter Url
                </label>
                <input
                  defaultValue={data?.socialLinks.twitter}
                  type="url"
                  id="website"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Twitter"
                  {...register("twitter", {
                    required: {
                      value: true,
                      message: "Twitter url is required",
                    },
                  })}
                />
                {errors.twitter?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.twitter.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Copy Right Text
                </label>
                <input
                  defaultValue={data?.copyright}
                  type="text"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Copy Right"
                  {...register("copyright", {
                    required: {
                      value: true,
                      message: "Copyright Text is required",
                    },
                  })}
                />
                {errors.copyright?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.copyright.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Contact No
                </label>
                <input
                  defaultValue={data?.phone}
                  type="number"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Phone"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Copyright Text is required",
                    },
                  })}
                />
                {errors.phone?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Address
                </label>
                <input
                  defaultValue={data?.address}
                  type="text"
                  className="bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  placeholder="Copy Right"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "address  is required",
                    },
                  })}
                />
                {errors.address?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.address.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  About Text
                </label>

                <textarea
                  defaultValue={data?.aboutText}
                  className="min-h-44 bg-base-300 border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  {...register("about", {
                    required: {
                      value: true,
                      message: "About url is required",
                    },
                  })}
                ></textarea>
                {errors.about?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.about.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2.5 text-sm font-medium text-heading">
                  Website Logo
                </label>

                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                  <div className="md:flex">
                    <div className="w-full ">
                      <div className="relative h-40 rounded-lg border-2 border-gray-600 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <div className="absolute flex flex-col items-center">
                          {preview ? (
                            <img
                              alt="File Icon"
                              className="h-28"
                              src={preview}
                            />
                          ) : (
                            <img
                              alt="File Icon"
                              className="mb-3"
                              src={
                                data?.logo.displayUrl
                                  ? data?.logo.displayUrl
                                  : "https://img.icons8.com/dusk/64/000000/file.png"
                              }
                            />
                          
                          )}
                          

                          <span className="block text-gray-500 font-semibold">
                            Drag &amp; drop your files here
                          </span>
                          <span className="block text-gray-400 font-normal mt-1">
                            or click to upload
                          </span>
                        </div>

                        <input
                          name=""
                          onChange={handleChange}
                          className="h-full w-full opacity-0 cursor-pointer"
                          type="file"
                          accept="image/*"
                          // {...register("image")}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.image?.type === "required" && (
                    <span className="mt-1 text-red-600">
                      {errors.image.message}
                    </span>
                  )}
                  <span className="mt-1 text-red-600">
                    {error !== "" && error}
                  </span>
                </div>
              </div>
              <div>
                <button className="btn btn-primary min-w-full">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
