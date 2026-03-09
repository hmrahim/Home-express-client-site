import React from "react";
import { Helmet } from "react-helmet-async";
import PreBackButton from "../../Components/PreBackButton";
import QuotationRow from "./QuotationRow";
import { useQuery } from "@tanstack/react-query";
import { getQuotation } from "../../../api/AllApi";



const Quotations = () => {
  const { data, isPending ,refetch} = useQuery({
    queryKey: ["getQuotation"],
    queryFn: getQuotation,
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-Quotations</title>
        </Helmet>
        <div className=" md:w-11/12 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success">
          <PreBackButton title="All Quotations" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div className="p-6">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
              
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-600">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">No</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Vat Number</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Quotation Title</th>
                      <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {data?.data.map((quote, index) => (
                      <QuotationRow
                        key={quote._id}
                        quote={quote}
                        index={index}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotations;
