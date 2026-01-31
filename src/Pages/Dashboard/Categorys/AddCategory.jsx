import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import PreBackButton from "../../Components/PreBackButton";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import { postCategory } from "../../../api/AllApi";

const AddCategory = () => {
  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  // console.log(preview);
  // console.log(error);

  const handleChange = async (e) => {
    const files = e.target.files[0];
    setFile(files);
    // console.log("FILE:", files);

    if (!files) return;
    if (files.size > 1024 * 1000) {
      setError("Image size must be less then 1 Mb and file must be an image");
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
    mutationKey: ["postCategory"],
    mutationFn: (category) => postCategory(category),
    onSuccess: (res) => {
      if (res.status === 200) {
        console.log(res);
        toast.success("Category created successfully", {
          autoClose: 1000,
        });
        reset();
      }
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData,
    );
    const image = res.data.data.display_url;
    const category = { ...data, image };

    mutation.mutate(category);
  };
  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Add-Category</title>
        </Helmet>
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Add Category" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5  ">
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Category Name</legend>
                  <input
                    type="text"
                    placeholder="Category name"
                    className="input input-success w-full"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Category is required",
                      },
                    })}
                  />
                </fieldset>
                {errors.name?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
              <div class="md:flex">
                <div class="w-full p-3">
                  <div class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                    <div class="absolute flex flex-col items-center">
                      <img
                        alt="File Icon"
                        class="mb-3 h-16 w-16"
                        src={
                          preview
                            ? preview
                            : `https://img.icons8.com/dusk/64/000000/file.png`
                        }
                      />
                      <span class="block text-gray-500 font-semibold">
                        Drag &amp; drop your files here
                      </span>
                      <span class="block text-gray-400 font-normal mt-1">
                        or click to upload
                      </span>
                    </div>

                    <input
                      onChange={handleChange}
                      name=""
                      class="h-full w-full opacity-0 cursor-pointer"
                      type="file"
                    />
                  </div>
                </div>
              </div>
              {error && error}
            </div>

            <button className="btn w-full md:w-2/12 btn-success my-4">
              Add category
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
