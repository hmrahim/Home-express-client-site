import axios from "axios";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllCategorys, postProduct } from "../../../api/AllApi";
import { countryApi } from "../../../api/countryApi";
import PreBackButton from "../../Components/PreBackButton";
import { Helmet } from "react-helmet-async";
import productUnits from "./unit";
import { IoMdCheckmark } from "react-icons/io";

const AddProduct = () => {
  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data, isPending, refetch } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: fetchAllCategorys,
    refetchInterval: 1000,
  });

    const {
      register,
      control,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
 

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const variants = watch("variants");

  const mutation = useMutation({
    mutationKey: [""],
    mutationFn: (Pdata) => postProduct(Pdata),
    onSuccess: (res) => {
      if (res.data.status === 200) {
        toast.success("Product added successfully");
        reset();
        setImage("");
      }
    },
  });

  const imageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const uploadPromise = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );

        if (!res.data.success) {
          throw new Error("Upload failed");
        }
        return res.data.data.display_url;
      });

      const results = await Promise.all(uploadPromise);
      setImage(results);
    } catch (error) {
      // console.log(error.message);
    }
  };
  // console.log(image);

  const onSubmit = async (data) => {
    const form = {
      name: data.name,
      brand: data.brand,
      category: data.category,
      country: data.country,
      desc: data.desc,
      discount: data.discount,
      minQty: data.minQty,
      price: data.price,
      unit: data.unit,
      image: image,
    };

    const uploadImage = async (file) => {
      if (file !== undefined) {
        setLoading(true);
      }

      const formData = new FormData();
      formData.append("image", file); // ফাইল form data তে add করলাম

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
        formData
      );

      const data = res.data.data.url;
      return data; // এখানে image এর link পাওয়া যাবে
    };

    const variants = await Promise.all(
      data.variants.map(async (variant) => {
        const files = Array.from(variant.images || []);
        const images = await Promise.all(
          files.map((file) =>
            typeof file === "string" ? file : uploadImage(file)
          )
        );
        if (images) {
          setLoading(false);
        }
        return {
          color: variant.color,
          size: variant.size,
          price: variant.price,
          stock: variant.stock,
          images: images[0], // এখন URL array
        };
      })
    );
    const Pdata = { ...form, variants };

    mutation.mutate(Pdata);
  };

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Add-product</title>
        </Helmet>
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Add Product" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
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
                    <option disabled={true}>
                      {isPending ? "Loading..." : " Select Category"}
                    </option>
                    {data?.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
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
                    step="0.01"
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
                  <legend className="fieldset-legend">Unit</legend>
                  <select
                    defaultValue="Pick a unit"
                    className="select select-success w-full"
                    {...register("unit", {
                      required: {
                        value: true,
                        message: "Unit is required",
                      },
                    })}
                  >
                    <option disabled={true}>Select Unit</option>
                    {productUnits.map((unit) => (
                      <option value={unit.value}>{unit.label}</option>
                    ))}
                  </select>
                </fieldset>
                {errors.unit?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.unit.message}
                  </span>
                )}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Min Quantity</legend>
                  <input
                    type="number"
                    placeholder="Minimum Quantity"
                    className="input input-success w-full"
                    step="0.01"
                    {...register("minQty", {
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    })}
                  />
                </fieldset>
                {errors.minQty?.type === "required" && (
                  <span className="mt-1 text-red-600">
                    {errors.minQty.message}
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
                    {countryApi?.map((country, index) => (
                      <option value={country.name}>{country.name}</option>
                    ))}
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
                    multiple
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
            <h1 className="text-2xl text-center mt-5">Add Varient</h1>
            <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600 my-3" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Variants</h2>

                {/* Add Variant Button */}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      color: "",
                      size: "",
                      price: "",
                      stock: "",
                      images: "",
                    })
                  }
                  className="bg-black text-white px-4 py-2 rounded-md text-sm"
                >
                  ➕ Add Variant
                </button>
              </div>

              {/* ===============================
             VARIANT LOOP
             =============================== */}
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-4 bg-gray-50"
                >
                  {/* Variant header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Variant #{index + 1}</h3>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm"
                    >
                      ❌ Remove
                    </button>
                  </div>

                  {/* Variant fields */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                      {...register(`variants.${index}.color`, {
                        required: true,
                      })}
                      placeholder="Color"
                      className="border rounded-md px-3 py-2"
                    />

                    <input
                      {...register(`variants.${index}.size`, {
                        required: true,
                      })}
                      placeholder="Size"
                      className="border rounded-md px-3 py-2"
                    />

                    <input
                      type="number"
                      {...register(`variants.${index}.price`, {
                        required: true,
                      })}
                      placeholder="Price"
                      className="border rounded-md px-3 py-2"
                    />

                    <input
                      type="number"
                      {...register(`variants.${index}.stock`, {
                        required: true,
                      })}
                      placeholder="Stock"
                      className="border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* ===============================
                 IMAGE UPLOAD
                 =============================== */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Variant Images
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        {...register(`variants.${index}.images`, {
                          required: true,
                        })}
                        type="file"
                      />
                    </div>

                    {/* Image Preview Grid */}
                    <div className="grid grid-cols-4 gap-2 mt-3"></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn w-full md:w-2/12 btn-success my-4">
              {mutation.isPending || loading ? "Loading..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
