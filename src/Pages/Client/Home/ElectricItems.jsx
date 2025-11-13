import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import product2 from "../../../assets/cat-2.jpg";
import product3 from "../../../assets/cat-3.jpg";
import product4 from "../../../assets/cat-4.jpg";
import product5 from "../../../assets/cat-5.jpg";
import product6 from "../../../assets/cat-6.jpg";
import product7 from "../../../assets/cat-7.jpg";
import ProductCard from "../../Components/ProductCard";
import SeeAll from "../../Components/SeeAll";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ElectricItems = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["productHome"],
    queryFn: () =>
      axios.get("https://server-site-psi-inky.vercel.app/api/product"),
  });
  const electric = data?.data.filter(elec => elec.category === "Electric")
  return (
    <div className="w-11/12 mx-auto my-20  text-center bg-white ">
      <SectionTitle title="Electric Items" />
      <div className="shadow-md  bg-slate-300 rounded-md pb-3 px-4">
        <div className="grid md:grid-cols-4  lg:grid-cols-6  grid-cols-2 gap-4 my-2 justify-items-center  my-2 py-4">
          { 
          isPending ? "Loading...." :
          electric.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              refetch={refetch}
            />
          ))
            
          }
        </div>
        <SeeAll />
      </div>
    </div>
  );
};

export default ElectricItems;
