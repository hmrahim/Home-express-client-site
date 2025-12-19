import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import PreBackButton from "../../Components/PreBackButton"

const AddCategory = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("https://server-site-psi-inky.vercel.app/api/category", { data });
    if (res.status === 200) {
      toast.success("Category created successfully");
      reset();
    }
  
  };
  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
         <PreBackButton title="Add Category"/>
          <hr className="h-1 bg-primary" />
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
