import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle";
import PreBackButton from "../../Components/PreBackButton";
import { Link } from "react-router-dom";
import EmailRow from "./EmailRow";
import { useQuery } from "@tanstack/react-query";
import { getEmails } from "../../../api/AllApi";
import LoadingSpiner from "../../Components/Loader/LoadingSpiner";

const AllEmails = () => {

    const {data,isPending} = useQuery({
        queryKey:["getEmails"],
        queryFn:getEmails,
        refetchInterval:1000
    })

   if(isPending){
    return <LoadingSpiner/>
}

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-All-Emails</title>
        </Helmet>
        <div
          style={{ overflow: "scroll" }}
          className=" md:w-5/6 w-full max-h-screen   mx-auto py-5 bg-base-100 rounded-lg shadow-lg  border border-success"
        >
          <PreBackButton title="All Emails" />
          <hr className="h-1 bg-primary mx-5" />
          <div class="p-4">
            <div class="overflow-x-auto">
              <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      No
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Message
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    {
                     data &&   data?.data?.map((email,index)=>  <EmailRow key={email?._id} email={email} index={index}  />)
                    }
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default AllEmails;
