import axios from "axios";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const AdminProductForm = () => {
  const imgbbKey = import.meta.env.VITE_API_KEY_IMGBB;
  const {
    register, // input কে RHF এর সাথে connect করে
    control, // dynamic field array handle করার জন্য
    handleSubmit, // form submit handle করে
    setValue, // manually value বসানোর জন্য (image upload)
    watch, // live form data দেখার জন্য
    formState: { errors }, // validation error ধরার জন্য
  } = useForm({
    defaultValues: {
      name: "", // product name
      description: "", // product description
      variants: [], // initially কোনো variant নাই
    },
  });

  /* ===============================
     STEP–2.2: useFieldArray
     এটা দিয়ে আমরা dynamic variant add/remove করবো
     =============================== */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  // form এর current variants data live দেখার জন্য
  const variants = watch("variants");

  /* ===============================
     STEP–2.3: Submit Handler
     =============================== */

  const onSubmit = (data) => {
    // এখানে পুরো product object আসবে
    console.log("FINAL PRODUCT DATA 👉", data);
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-6">🛠️ Admin – Add Product</h1>

      {/* Form card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {/* ===============================
           PRODUCT INFO
           =============================== */}
        <div className="space-y-4"></div>

        {/* ===============================
           VARIANTS SECTION
           =============================== */}
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
                  {...register(`variants.${index}.color`, { required: true })}
                  placeholder="Color"
                  className="border rounded-md px-3 py-2"
                />

                <input
                  {...register(`variants.${index}.size`, { required: true })}
                  placeholder="Size"
                  className="border rounded-md px-3 py-2"
                />

                <input
                  type="number"
                  {...register(`variants.${index}.price`, { required: true })}
                  placeholder="Price"
                  className="border rounded-md px-3 py-2"
                />

                <input
                  type="number"
                  {...register(`variants.${index}.stock`, { required: true })}
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

                <input  {...register(`variants.${index}.images`, { required: true })} type="file" />

                {/* Image Preview Grid */}
                <div className="grid grid-cols-4 gap-2 mt-3"></div>
              </div>
            </div>
          ))}
        </div>

        {/* ===============================
           SAVE BUTTON
           =============================== */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
          >
            💾 Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
