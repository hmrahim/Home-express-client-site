import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { getCategoryById, putCategory } from "../../api/AllApi";
import { useMutation, useQuery } from "@tanstack/react-query";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getCategoryById(id),
    refetchInterval: 1000,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationKey: ["putCategory"],
    mutationFn: (data) => putCategory(id, data),
  });
  const onSubmit = async (data) => {
    mutation.mutate(data);
      Swal.fire({
        title: "Category updated!",
        icon: "success",
        draggable: false,
      });
    
  
    
    navigate("/dashboard/all-category");
  };
  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Update-Category</title>
        </Helmet>
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <h1 className="text-2xl font-bold text-primary text-center pb-2">
            Update Category
          </h1>{" "}
            <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5  ">
              {
                isPending ? "Loading..." :
             
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend"> Category Name</legend>
                  <input
                    type="text"
                    placeholder="Category name"
                    className="input input-success w-full"
                    defaultValue={data?.name}
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
               }
            </div>
            <button className="btn w-full md:w-2/12 btn-success my-4">
            {
              mutation.isPending ? "Updading" :"Update category"
            }
              
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;
