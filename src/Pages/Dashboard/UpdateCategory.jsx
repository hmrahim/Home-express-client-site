import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from 'sweetalert2'

const UpdateCategory = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://server-site-psi-inky.vercel.app/api/category/${id}`)
      .then((res) => setItem(res.data));
  }, []);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.put(`https://server-site-psi-inky.vercel.app/api/category/${id}`, {
      data,
    });
    if (res.status === 200) {
      Swal.fire({
  title: "Category updated!",
  icon: "success",
  draggable: false
});
     
    }
     navigate("/dashboard/all-category")
  };
  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <h1 className="text-2xl font-bold text-primary text-center pb-2">
            Update Category
          </h1>{" "}
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
                    defaultValue={item && item.name}
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
              Update category
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;
