import React, { useState } from "react";
import Banner from "../../Components/Banner";
import Featured from "./Featured";
import ElectricItems from "./ElectricItems";
import PlumbingItems from "./PlumbingItems";
import PaintingItems from "./PaintingItems";

import { useQuery } from "@tanstack/react-query";
import {
  fetchAllCategorys,
  fetchProductForUser,
  fetchSeacrhProduct,
} from "../../../api/AllApi";
import SectionTitle from "../../Components/SectionTitle";
import ProductCard from "../../Components/ProductCard";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [search, setSearch] = useState("");
  const [catValue, setCatValue] = useState("");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["featuredItem"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });
  const { data: catData, isPending: catIspedning } = useQuery({
    queryKey: ["fetchAllCategorys"],
    queryFn: fetchAllCategorys,
    refetchInterval: 1000,
  });
  const { data: searchData, isPending: loadingSearch } = useQuery({
    queryKey: ["fetchProductBySearch"],
    queryFn: () => fetchSeacrhProduct(search),
    refetchInterval: 1000,
  });
  let filterdData = [];
  if (catData?.length > 0) {
    filterdData = data?.filter((elec) => elec.category === catValue);
  }
  if (search?.length > 0) {
    filterdData = searchData;
  }

  return (
    <div className=" ">
      <Banner />
      <Helmet>
        <title>Moom24-Home</title>
      </Helmet>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-2xl mx-auto mt-5 shadow-green"
      >
        <div className="flex justify-center items-center ">
          <select
            onChange={(e) => setCatValue(e.target.value)}
            className=" bg-primary rounded-l-full text-white px-4 py-[20px] outline-none cursor-pointer --webkit-appearance: none --moz-appearance:none appearance:none "
          >
            <option>Select Category</option>
            {catData &&
              catData?.map((cat) => (
                <option value={cat.name} key={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          {/* <!-- From Uiverse.io by jubayer-10 -->  */}
          <div className="p-5 overflow-hidden w-[60px] h-[61px] hover:w-[270px] bg-primary shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-r-full flex group items-center hover:duration-300 duration-300">
            <div className="flex items-center justify-center fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Isolation_Mode"
                data-name="Isolation Mode"
                viewBox="0 0 24 24"
                width="22"
                height="24"
              >
                <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
              </svg>
            </div>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="outline-none text-[18px]  w-full ml-2 text-white hover:text-gray-900 font-normal px-4 py-2 bg-transparent rounded-full hover:bg-white"
              placeholder="Search"
            />
          </div>
        </div>
      </form>
      {filterdData?.length > 0 ? (
        <div className="w-11/12 mx-auto mt-5  text-center bg-white">
          {search?.length > 0 ? (
            <SectionTitle title={`Search Result for "${search}"`} />
          ) : (
            <SectionTitle title={`Category: ${catValue}`} />
          )}

          <div className="w-full shadow-md  bg-slate-300 rounded-md px-4 py-5">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 my-2 justify-items-center ">
              <>
                {filterdData?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Featured />
          <ElectricItems />
          <PlumbingItems />
          <PaintingItems />
        </>
      )}
    </div>
  );
};

export default Home;
