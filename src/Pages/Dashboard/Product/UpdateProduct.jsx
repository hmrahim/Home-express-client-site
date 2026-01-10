import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchAllCategorys, updateProduct } from "../../../api/AllApi";
import { countryApi } from "../../../api/countryApi";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import productUnits from "./unit";
import Loader from "../../Components/Loader/Loader";

const UpdateProduct = () => {
  const { id } = useParams();
  const [items, setIems] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["productbyid", id],
    queryFn: () =>
      axios.get(
        `https://moom24-backend-production.up.railway.app/api/product/${id}`
      ),
  });

  const oldImage = data?.data.image;

  const {
    data: data1,
    isPending: isPending1,
    refetch: refetch1,
  } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: fetchAllCategorys,
  });

  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;

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

  const imageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
      formData
    );

    setImage(res.data.data.url);
  };

  const mutation = useMutation({
    mutationFn: (uPdata) => updateProduct(id, uPdata),
    onSuccess: (res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Product updated!",
          icon: "success",
          draggable: false,
        });
        Navigate("/dashboard/all-product");
      }
    },
  });

  const onSubmit = async (data) => {
    // const updateImage = image !== "" ? image : oldImage;
    const newImage = { ...data, image };
    const OldImage = { ...data, oldImage };

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
          images: images[0],
        };
      })
    );

    const uData = { ...form, variants };
    mutation.mutate(uData);

    // if (image === "") {
    //   mutation.mutate(OldImage);
    // } else {
    // }
  };
  if (isPending || data === undefined) {
    return <Loader />;
  }

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Update-product</title>
        </Helmet>
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Update Product" />
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
                    defaultValue={data?.data.name}
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Product name is required",
                      },
                    })}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product category</legend>
                  <select
                    className="select select-success w-full"
                    {...register("category", {
                      required: {
                        value: true,
                        message: "Category is required",
                      },
                    })}
                  >
                    <option disabled={true}>
                      {" "}
                      {isPending1 ? "Loading..." : " Select Category"}
                    </option>
                    {data1?.map((category) => (
                      <option
                        value={category.name}
                        selected={
                          data?.data.category === category.name ? true : false
                        }
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Price</legend>
                  <input
                    type="number"
                    placeholder="Product Price"
                    className="input input-success w-full"
                    defaultValue={data?.data?.price}
                    step="0.01"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                      type: {
                        value: "number",
                        message: "Price must be a number",
                      },
                    })}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Unit</legend>
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
                {/* {errors.price?.type === "required" && (
                    <span className="mt-1 text-red-600">
                      {errors.price.message}
                    </span>
                  )} */}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Minimum Quantity</legend>
                  <input
                    type="number"
                    placeholder="Minimum Quantity"
                    className="input input-success w-full"
                    defaultValue={data?.data?.minQty}
                    step="0.01"
                    {...register("minQty", {
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    })}
                  />
                </fieldset>
                {/* {errors.price?.type === "required" && (
                    <span className="mt-1 text-red-600">
                      {errors.price.message}
                    </span>
                  )} */}
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Product Brand</legend>
                  <input
                    type="text"
                    placeholder="Product Brand"
                    className="input input-success w-full"
                    defaultValue={data?.data.brand}
                    {...register("brand", {
                      required: {
                        value: true,
                        message: "Brand is required",
                      },
                    })}
                  />
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    {" "}
                    Menufacturer Country
                  </legend>
                  <select
                    className="select select-success w-full"
                    defaultValue={data?.data.country}
                    {...register("country", {
                      required: {
                        value: true,
                        message: "Brand is required",
                      },
                    })}
                  >
                    <option disabled={true}>Select Country</option>
                    {countryApi?.map((country) => (
                      <option
                        value={country.name}
                        selected={
                          data?.data.country === country.name ? true : false
                        }
                      >
                        {country.name}
                      </option>
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
                  <legend className="fieldset-legend">
                    {" "}
                    Product Discount (% off)
                  </legend>
                  <input
                    type="number"
                    placeholder="Product Discount"
                    className="input input-success w-full"
                    defaultValue={data?.data.discount}
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
                    defaultValue={data?.data.desc}
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
                  />
                </fieldset>
              </div>
              <div className="flex justify-center items-center flex-col    border border-success shadow-2xl">
                <div>
                  <img
                    src={image ? image : oldImage}
                    className="  rounded-3xl max-h-32 w-28"
                    alt="Product Image"
                  />

                  <p className="text-center p-5">Upload your image</p>
                </div>
              </div>
            </div>

            <h1 className="text-2xl text-center mt-5">Update Variant</h1>
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
              {mutation.isPending || loading
                ? "Updating..."
                : " Update Product"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProduct;
