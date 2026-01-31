import React from "react";
import CategoryRow from "./CategoryRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchAllCategorys } from "../../../api/AllApi";
import PreBackButton from "../../Components/PreBackButton";
import { Helmet } from "react-helmet-async";

const AllCategory = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["fetchAllCategorys"],
    queryFn: fetchAllCategorys,
    refetchInterval: 1000,
  });

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-All-Category</title>
        </Helmet>
        <div className=" md:w-1/2 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg py-4 border border-success">
          <PreBackButton title="All Category" />
          <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div className="overflow-x-auto  md:h-[400px]  ">
            <table className="table table-zebra-zebra">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>No</th>
                  <th>image</th>
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
