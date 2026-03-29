import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { getQuotationById, updateQuotation } from "../../../api/AllApi";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function UpdateQuotation() {
  const { id } = useParams();
  const [approve,setAprove] = useState(false)
  console.log(approve)
  // 🔥 TanStack Query দিয়ে quotation fetch
  const { data: quotation, isLoading , refetch} = useQuery({
    queryKey: ["quotation", id],
    queryFn: () => getQuotationById(id),
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "products",
  });

  // 🔥 Data আসলে form এ বসানো
  useEffect(() => {
    if (quotation?.products) {
      reset({
        products: quotation.products,
      });
    }
  }, [quotation, reset]);

  const mutation = useMutation({
    mutationFn: (data) => updateQuotation(data, id),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success("Quotation approved successfully", { autoClose: 1000 });
        refetch()
      }
    },
  });
  // 🔥 Submit
  const onSubmit = (data) => {
   

     Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Approved!",
        }).then((result) => {
          if (result.isConfirmed) {
           mutation.mutate(data.products);
            Swal.fire({
              title: "Approved!",
              text: "Your file has been Approved.",
              icon: "success",
            });
          }
        });
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-Quotations</title>
        </Helmet>
        <div className=" md:w-11/12 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success">
          <PreBackButton title="Update Quotations" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-6xl mx-auto p-6">
              {/* 🔥 Header */}

              {/* 🔥 Table Section */}
              <div className="bg-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className=" border-b flex justify-between gap-5 items-center">
                  <div className="">
                    <div className="bg-white m-2 rounded-2xl shadow-lg flex items-center p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                      {/* 🔹 Status Badge */}
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
        ${
          quotation.status === "Approved"
            ? "bg-green-100 text-green-800"
            : quotation.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
        }`}
                      >
                        {quotation.status}
                      </span>

                      {/* 🔹 View Summary Button */}
                      <Link to={`/dashboard/quotations-invoice/${quotation._id}`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300">
                        View Summary
                      </Link>
                    </div>
                  </div>
                  <div className="flex justify-between gap-10">
                    <div>
                      <p className="font-medium text-gray-500">Company Name</p>
                      <p className="mt-1 text-gray-800">{quotation.company}</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-500">VAT Number</p>
                      <p className="mt-1 text-gray-800">{quotation.vatNo}</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-500">Phone</p>
                      <p className="mt-1 text-gray-800">{quotation.phone}</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-500">Address</p>
                      <p className="mt-1 text-gray-800">{quotation.address}</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-600">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Unit</th>
                        <th className="px-6 py-4">Color</th>
                        <th className="px-6 py-4">Size</th>
                        <th className="px-6 py-4">Price</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      {fields.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {/* Name */}
                          <td className="px-6 py-4">
                            <input
                              {...register(`products.${index}.name`, {
                                required: "Name is required",
                              })}
                              className="w-full border rounded-lg p-2"
                            />
                            {errors.products?.[index]?.name && (
                              <p className="text-red-500 text-xs">
                                {errors.products[index].name.message}
                              </p>
                            )}
                          </td>

                          {/* Quantity */}
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              {...register(`products.${index}.quantity`, {
                                required: "Quantity required",
                                min: { value: 1, message: "Min 1" },
                              })}
                              className="w-full border rounded-lg p-2"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              {...register(`products.${index}.unit`)}
                              className="w-full border rounded-lg p-2"
                            />
                          </td>

                          {/* Color */}
                          <td className="px-6 py-4">
                            <input
                              {...register(`products.${index}.color`)}
                              className="w-full border rounded-lg p-2"
                            />
                          </td>

                          {/* Size */}
                          <td className="px-6 py-4">
                            <input
                              {...register(`products.${index}.size`)}
                              className="w-full border rounded-lg p-2"
                            />
                          </td>

                          {/* Price */}
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              {...register(`products.${index}.price`, {
                                required: "Price required",
                              })}
                              className="w-full border rounded-lg p-2"
                              placeholder="Price"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 🔥 Submit Button */}
                <div className="p-6 flex gap-4 items-center">
                   <div className="">
                      {/* ✅ Approved Checkbox */}
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                        onChange={(e)=> setAprove(e.target.checked) }
                          type="checkbox"
                          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-400"
                        />
                        <span className="text-gray-700 font-medium">
                          Approved
                        </span>
                      </label>

                   
                    </div>
                  <button
                  disabled={approve === true ? false : true}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
