import { useContext, useState } from "react";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { useQuery } from "@tanstack/react-query";
import { getAllQuotationByEmail } from "../../../api/AllApi";
import PreBackButton from "../../Components/PreBackButton";
import { Link } from "react-router-dom";

export default function QuotList() {
  const { email } = useContext(AuthContextDashboard);
  const [filter, setFilter] = useState("all");
    const { data: quotations , isPending } = useQuery({
    queryKey: ["getAllQuotationByEmail", email],
    queryFn: () => getAllQuotationByEmail(email),
    refetchInterval: 5000, // Refetch every 5 seconds
      
    })

const date = new Date(quotations?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );

    


  const filteredQuotations =
    filter === "all"
      ? quotations
      : quotations?.filter((q) => q.status === filter);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PreBackButton title="My Quotations"/>
      <hr className="h-1 bg-primary mb-5" />
     

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        {["all", "Approved", "rejected"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-full font-medium transition 
              ${
                filter === item
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Quotation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredQuotations?.map((quote) => (
          <div
            key={quote.id}
            className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{quote.id}</h3>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium 
                  ${
                    quote.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {quote.status}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-2">
              Date: {new Date(quote?.createdAt).toLocaleDateString()}
            </p>

            {
              quote.status === "Approved" ? 
            

            <p className="text-xl font-bold text-gray-800 my-5">
              { Number(             quote?.products.reduce(
    (sum, p) => sum + Number(p.price) * Number(p.quantity),
    0
  ))
   
              }
            </p>
            : ""
}
           

            <Link to={`/dashboard/quotations-invoice/${quote._id}`} className="my-6  w-full bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredQuotations?.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No quotations found.
        </p>
      )}
    </div>
  );
}