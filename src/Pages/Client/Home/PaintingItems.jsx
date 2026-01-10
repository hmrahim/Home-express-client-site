import React from "react";
import SectionTitle from "../../Components/SectionTitle";

import ProductCard from "../../Components/ProductCard";
import SeeAll from "../../Components/SeeAll";
import { useQuery } from "@tanstack/react-query";
import { fetchProductForUser } from "../../../api/AllApi";
import CardLoader from "../../Components/CardLoader";
const PaintingItems = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["featuredItem"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });
  const paint = data?.filter((elec) => elec.category === "Paint");

  return (
    <div className="w-11/12 mx-auto my-20  text-center bg-white">
      <SectionTitle title="Painting Items" />
       <div className="shadow-md  bg-slate-300 rounded-md pb-3 px-4">
        {
          isPending ? 
           <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 my-2 justify-items-center ">
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
            <CardLoader/>
         
        </div>
        : 
       
        <div className="grid md:grid-cols-4  lg:grid-cols-6  grid-cols-2 gap-4 my-2 justify-items-center  my-2 py-4 ">
          <>
            {
              paint?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </>
        </div>
         }
        <SeeAll />
      </div>
    </div>
  );
};

export default PaintingItems;
