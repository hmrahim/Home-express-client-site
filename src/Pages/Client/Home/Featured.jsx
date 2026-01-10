import React from "react";
import ProductCard from "../../Components/ProductCard";

import { useQuery } from "@tanstack/react-query";
import { fetchProductForUser } from "../../../api/AllApi";
import Loader from "../../Components/Loader/Loader";
import CardLoader from "../../Components/CardLoader";
import SectionTitle from "../../Components/SectionTitle";

const Featured = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["featuredItem"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });
  const featured = data?.filter((elec) => elec.category === "Featured");

  return (
    <div className="w-11/12 mx-auto mt-5  text-center bg-white">
      <SectionTitle title="Featured Items" />
      <div className="w-full shadow-md  bg-slate-300 rounded-md px-4 py-5">
        
       
        {
          isPending ? 
          <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 my-2 justify-items-center ">
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
         
        </div>
        : 
       
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 my-2 justify-items-center ">
          <>
            {
              featured?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </>
        </div>
         }
      </div>
    </div>
  );
};

export default Featured;
