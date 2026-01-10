import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import Featured from "./Featured";
import ElectricItems from "./ElectricItems";
import PlumbingItems from "./PlumbingItems";
import PaintingItems from "./PaintingItems";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchAllCategorys,
  fetchProductForUser,
  fetchSeacrhProduct,
  postVisitor,
} from "../../../api/AllApi";
import SectionTitle from "../../Components/SectionTitle";
import ProductCard from "../../Components/ProductCard";
import { Helmet } from "react-helmet-async";
import { UAParser } from "ua-parser-js";

const Home = () => {
  const [search, setSearch] = useState("");
  const [catValue, setCatValue] = useState("");

  const parser = new UAParser(navigator.userAgent);

  // Parsed result object
  const result = parser.getResult();

  const browserInfo = {
    browserName: result.browser.name, // Chrome / Firefox / Edge
    browserVersion: result.browser.version, // 120.0.6099.109
    os: result.os.name, // Windows / Android / iOS
    osVersion: result.os.version, // OS version
    deviceType: result.device.type || "desktop", // mobile / tablet / desktop
    deviceVendor: result.device.vendor || "Unknown",
  };

  const page = window.location.pathname;
  const referrer =
    document.referrer && document.referrer !== ""
      ? document.referrer
      : "direct";

  const visitor = {
    page: page,
    referrer: referrer,
    userAgent: browserInfo,
  };

  const mutation = useMutation({
    mutationFn: (visitor) => postVisitor(visitor),
  });

  useEffect(() => {
    mutation.mutate(visitor);
  }, []);

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
        <title>Moom24</title>
      </Helmet>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-2xl mx-auto mt-5 shadow-green"
      >
        <div className="flex justify-center items-center ">
          <select
            onChange={(e) => setCatValue(e.target.value)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-l-full text-white px-4 py-[19px] outline-none cursor-pointer --webkit-appearance: none --moz-appearance:none appearance:none "
          >
            <option className="text-black">
              {catIspedning ? "Loading..." : "Select Category"}
            </option>
            {catData &&
              catData?.map((cat) => (
                <option
                  className="text-black bg-gradient-to-r from-green-500 to-emerald-600"
                  value={cat.name}
                  key={cat._id}
                >
                  {cat.name}
                </option>
              ))}
          </select>

          {/* <!-- From Uiverse.io by jubayer-10 -->  */}
          <div className="p-5 overflow-hidden w-[60px] h-[61px] hover:w-[270px] bg-gradient-to-l from-green-500 to-emerald-600 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-r-full flex group items-center hover:duration-300 duration-300">
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

          <div className="container mx-auto px-3 sm:px-4 lg:px-6  bg-slate-300 rounded-md  py-5">
            <div
              className=" grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      sm:gap-5
      md:gap-6"
            >
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
          <ElectricItems />
        </>
      )}
    </div>
  );
};

export default Home;
