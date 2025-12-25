import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import ProductCard from "../../Components/ProductCard";
import product2 from "../../../assets/cat-2.jpg";
import product3 from "../../../assets/cat-3.jpg";
import product4 from "../../../assets/cat-4.jpg";
import product5 from "../../../assets/cat-5.jpg";
import product6 from "../../../assets/cat-6.jpg";
import product7 from "../../../assets/cat-7.jpg";
import product8 from "../../../assets/cat-8.jpg";
import product9 from "../../../assets/cat-9.jpg";
import SeeAll from "../../Components/SeeAll";
import { useQuery } from "@tanstack/react-query";
import { fetchProductForUser } from "../../../api/AllApi";
import CardLoader from "../../Components/CardLoader";

const PlumbingItems = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["featuredItem"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });
  const plumbing = data?.filter((elec) => elec.category === "Plumbing");

  return (
    <div className="w-11/12 mx-auto my-20  text-center bg-white">
      <SectionTitle title="Plumbing Items" />
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
       
        <div className="grid md:grid-cols-4  lg:grid-cols-6  grid-cols-2 gap-4 my-2 justify-items-center  my-2 py-4">
          <>
            {
              plumbing?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            }
          </>
        </div>
         }
        <SeeAll title="Plumbing Items" />
      </div>
    </div>
  );
};

export default PlumbingItems;
