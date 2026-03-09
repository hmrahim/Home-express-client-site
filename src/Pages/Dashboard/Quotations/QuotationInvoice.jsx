import React from "react";
import { useParams } from "react-router-dom";
import { getQuotationById } from "../../../api/AllApi";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";


export default function QuotationInvoice() {
   const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Quotation Invoice",
  });
   
 
    const {id} = useParams()
 const { data: quotation, isLoading , refetch} = useQuery({
    queryKey: ["quotation", id],
    queryFn: () => getQuotationById(id),
  });

console.log(quotation);
  const totalAmount = quotation?.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <div>

   
    <div ref={invoiceRef}  className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quotation Invoice</h1>
          <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <h2 className="font-bold text-xl">MOOM24</h2>
          <p className="text-gray-500">Addres: AL Malaz</p>
          <p className="text-gray-500">Riyadh, Saudi Arabia</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700">Customer: {quotation?.company}</h3>
        <p className="text-gray-600"></p>
        <p className="text-gray-600">{quotation?.email}</p>
        <p className="text-gray-600">Vat Number: {quotation?.vatNo}</p>
        <p className="text-gray-600">Phone: {quotation?.phone}</p>
        <p className="text-gray-600">Address: {quotation?.address}</p>
      </div>

      {/* Products Table */}
      <table className="w-full text-left border border-gray-300 mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Product</th>
          
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {quotation?.products?.map((p, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{p?.name}</td>
            
              <td className="border px-4 py-2">{p?.quantity}</td>
              <td className={`border px-4 py-2 ${p.status !== "approved" ? "text-red-500" : " " }`}>{p.status === "approved" ?  p?.price : "pending"}</td>
              <td className={`border px-4 py-2 ${p.status !== "approved" ? "text-red-500" : " " }`}>{p.status === "approved" ?  p?.quantity * p?.price : "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount */}
      <div className="text-right font-semibold text-lg">
        Total: {totalAmount}
      </div>

      {/* Summary / Download Button */}
      <div className="mt-6 text-right">
        
      </div>
    </div>
    <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download PDF
        </button>
     </div>
  );
}