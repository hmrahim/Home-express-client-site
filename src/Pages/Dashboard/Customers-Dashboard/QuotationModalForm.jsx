import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { postQuotation } from "../../../api/AllApi";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { toast } from "react-toastify";

export default function QuotationModalForm({setProducts}) {
    const {email} = useContext(AuthContextDashboard)

      const [productss, setProductss] = useState([]);
        useEffect(() => {
          const stored = localStorage.getItem("quotationProducts");
          if (stored) {
            setProductss(JSON.parse(stored));
          }
        }, []);
   
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

const mutation = useMutation({
    mutationFn:(quotation)=> postQuotation(quotation),
    onSuccess:(res)=> {
        if(res.status === 200){
            localStorage.removeItem("quotationProducts")
           setProducts([])
            toast.success("Quotation submitd sucessfully")
            reset()



        }
    }
})
  const cleanedProducts = productss.map(({ id, ...rest }) => rest);
  const submitHandler = (data) => {
 
    const quotation = {
        products:cleanedProducts,
        email:email,
        title:data.title,
        company:data.company,
        vatNo:data.vatNo,
        phone:data.phone,
        address:data.address
    }

    
 
   mutation.mutate(quotation)



  
  };

  return (
    <div className=" inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl  p-6">

        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Create Quotation
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

          {/* Quotation Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quotation Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Quotation title is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter quotation title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              {...register("company", {
                required: "Company name is required",
              })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.company
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Vat Number
            </label>
            <input
              type="number"
              {...register("vatNo", {
                required: "Vat number is required",
              })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.vatNo
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter vat number"
            />
            {errors.vatNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.vatNo.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="number"
              {...register("phone", {
                required: "Phone number is required",
              })}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter vat number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
           <textarea
               {...register("address", {
                required: "Address is required",
              })}
             className={`textarea w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              placeholder="Enter address"
           >

           </textarea>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
          

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}