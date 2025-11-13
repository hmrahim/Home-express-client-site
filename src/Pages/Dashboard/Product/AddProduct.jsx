import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AddProduct = () => {
  const imgbbKey = "765622b71bed5a179efe4bce6d1d53c8";
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
    const { data, isPending, refetch } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("https://server-site-psi-inky.vercel.app/api/category"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const imageUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );

    setImage(res.data.data.url);
  };

  const onSubmit = async (data) => {
    const res = await axios.post("https://server-site-psi-inky.vercel.app/api/product", {
      ...data,
      image,
    });
    if(res.status === 200){
      toast.success("Product added successfully");
      reset();
      setImage("");
    }
  };


  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <h1 className="text-2xl font-bold text-primary text-center pb-2">
            Add New Product
          </h1>{" "}
          <hr className="h-1 bg-primary" />
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 grid md:grid-cols-3 gap-4 ">
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Name</legend>
                  <input
                    type="text"
                    placeholder="Product name"
                    className="input input-success w-full"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Product name is required",
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
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product category</legend>
                  <select
                    defaultValue="Pick a Runtime"
                    className="select select-success w-full"
                    {...register("category", {
                      required: {
                        value: true,
                        message: "Category is required",
                      },
                    })}
                  >
                    <option disabled={true}>Select Category</option>
                    {
                      data?.data?.map((category)=>    <option value={category.name} >{category.name}</option>)
                    }
                 
                    
                  </select>
                </fieldset>
                {errors.category?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Price</legend>
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="input input-success w-full"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    })}
                  />
                </fieldset>
                {errors.price?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Brand</legend>
                  <input
                    type="text"
                    placeholder="Product Brand"
                    className="input input-success w-full"
                    {...register("brand", {
                      required: {
                        value: true,
                        message: "Brand is required",
                      },
                    })}
                  />
                </fieldset>
                {errors.brand?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.brand.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    {" "}
                    Menufacturer Country
                  </legend>
                  <select
                    defaultValue="Pick a Runtime"
                    className="select select-success w-full"
                    {...register("country", {
                      required: {
                        value: true,
                        message: "Brand is required",
                      },
                    })}
                  >
                    <option disabled={true}>Select Country</option>
                    <option>German</option>
                    <option>Italy</option>
                    <option>Saudi</option>
                    <option>Pakistan</option>
                    <option>india</option>
                  </select>
                </fieldset>
                {errors.country?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Discount</legend>
                  <input
                    type="number"
                    placeholder="Product Discount"
                    className="input input-success w-full"
                    {...register("discount")}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    {" "}
                    Product description
                  </legend>
                  <textarea
                    placeholder="Success"
                    className="textarea textarea-success w-full"
                    {...register("desc", {
                      required: {
                        value: true,
                        message: "Description is required",
                      },
                    })}
                  ></textarea>
                </fieldset>
                {errors.desc?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.desc.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product image</legend>
                  <input
                    onChange={imageUpload}
                    type="file"
                    className="file-input file-input-success w-full"
                    // {...register("image", {
                    //   required: {
                    //     value: true,
                    //     message: "Image is required",
                    //   },
                    // })}
                  />
                </fieldset>
                {errors.image?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.image.message}
                  </span>
                )}
              </div>
              <div className="rounded-3xl flex justify-center items-center max-h-40 overflow-hidden   mx-w-40 border border-success shadow-2xl">
                <div>
                  {image ? (
                    <img
                      src={image}
                      className="  rounded-3xl"
                      alt="Product Image"
                    />
                  ) : (
                    <p className="text-center p-5">Upload your image</p>
                  )}
                </div>
              </div>
            </div>
            <button className="btn w-full md:w-2/12 btn-success my-4">
              Add Product
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
