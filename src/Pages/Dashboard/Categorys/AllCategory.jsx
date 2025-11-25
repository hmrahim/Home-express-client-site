import React from "react";
import CategoryRow from "./CategoryRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchAllCategorys } from "../../../api/AllApi";

const AllCategory = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["AllCategory"],
    queryFn: fetchAllCategorys,
    refetchInterval:1000
  });

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0">
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success">
          <h1 className="text-2xl font-bold text-primary text-center pb-2">
            All Category
          </h1>{" "}
          <hr className="h-1 bg-primary" />
          <div className="overflow-x-auto">
            
               
            
            <table className="table table-zebra-zebra">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
            
              <tbody>
                {data?.map((category, index) => (
                  <CategoryRow
                    key={category._id}
                    index={index}
                    items={category}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
