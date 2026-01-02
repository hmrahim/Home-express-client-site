import React from "react";
import ProductRow from "./ProductRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PreBackButton from "../../Components/PreBackButton";
import { Helmet } from "react-helmet-async";
import { getAuth } from "firebase/auth";
import { getAllProduct } from "../../../api/AllApi";
import Loader from "../../Components/Loader/Loader";

const AllProducts = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getAllProduct"],
    queryFn: getAllProduct,
    refetchInterval: 1000,
  });

if(isPending){
  return <Loader/>
}

  return (
    <div>
      <div className="bg-base-200 min-h-screen pt-10 px-5 md:px-0 ">
        <Helmet>
          <title>Dashboard-All-product</title>
        </Helmet>
        <div
          style={{ overflow: "scroll" }}
          className=" md:w-5/6 w-full max-h-screen   mx-auto py-5 bg-base-100 rounded-lg shadow-lg  border border-success"
        >
          <PreBackButton title="All Productu" />
            <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div>
            <div className="">
              <table className="table table-zebra-zebra table-xs  ">
                {/* head */}
                <thead className="">
                  <tr className="">
                    <th className="text-center ">NO</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Brand</th>
                    <th className="text-center">Country</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Unit</th>
                    <th className="text-center">MinQty</th>
                    <th className="text-center">Discount</th>
                    <th className="text-center">Desc.</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((product, index) => (
                    <ProductRow
                      key={product._id}
                      product={product}
                      index={index}
                    />
                  ))}
                </tbody>
                {/* foot */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
