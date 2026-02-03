import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteMarquee,
  getMarquee,
  postMarquee,
  putMarquee,
} from "../../../api/AllApi";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";

const MarqueeManager = () => {
  const [marquees, setMarquees] = useState([
    { id: 1, text: "Free Delivery All Over City" },
    { id: 2, text: "20% Discount on Plumbing Items" },
  ]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add / Update
  const mutation = useMutation({
    mutationFn: (marquee) =>
      editId ? putMarquee(marquee, editId) : postMarquee(marquee),

    onSuccess: (res) => {
      if (res.status === 200) {
        console.log(res)
        toast.success(res.data.message, { autoClose: 1000 });
        setOpen(false);
        reset();
      }
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["marquees"],
    queryFn: getMarquee,
    refetchInterval: 1000,
  });

  const onSubmit = (data) => {
    const marquee = { ...data, status: "active" };

    mutation.mutate(marquee);
  };

  // Edit
  const handleEdit = (marquee) => {
    setEditId(marquee._id);
    reset({ text: marquee.text });
    setOpen(true);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteMarquee(id),
    onSuccess: (res) => {
       if (res.status === 200) {
        toast.success(res.data.message, { autoClose: 1000 });
      }
    },
  });

  // Delete
  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <Helmet>
          <title>Dashboard-Add-Category</title>
        </Helmet>
        <div className="  md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Add Marquees" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-2xl font-bold">Marquee Manager</h2>
              <button
                onClick={() => {
                  setOpen(true);
                  reset();
                  setEditId(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                + Add Marquee
              </button>
            </div>

            {/* Table */}
            <div className="overflow-y-scroll max-h-[400px]">
              <table className="w-full border text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">No</th>
                    <th className="border p-2">Marquee Text</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data.data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.text}</td>
                      <td className="border p-2 space-x-2 space-y-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {marquees.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center p-4">
                        No marquee found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal */}
            {open && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white w-[400px] rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {editId ? "Edit Marquee" : "Add Marquee"}
                  </h3>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      placeholder="Enter marquee text"
                      className="w-full border p-2 rounded"
                      {...register("text", {
                        required: "Marquee text is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      })}
                    />

                    {errors.text && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.text.message}
                      </p>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeManager;
