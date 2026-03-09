import React, { useEffect, useState } from "react";
import Banner from "../../Components/Banner";
import Featured from "./Featured";
import ElectricItems from "./ElectricItems";
import PlumbingItems from "./PlumbingItems";
import PaintingItems from "./PaintingItems";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activeOffer,
  fetchAllCategorys,
  fetchProductForUser,
  fetchSeacrhProduct,
  postVisitor,
} from "../../../api/AllApi";
import SectionTitle from "../../Components/SectionTitle";
import ProductCard from "../../Components/ProductCard";
import { Helmet } from "react-helmet-async";
import { UAParser } from "ua-parser-js";
import ProductSlider from "../../Components/ProductSlider";
import CategoryHeader from "../../Components/CategoryHeader";
import CoverFLowSlider from "../../Components/CoverFLowSlider";
import { useTranslation } from "react-i18next";
import OfferPopup from "../../Components/Offer/OfferPopup";
import OfferBanner from "../../Components/Offer/OfferCountDown/OfferBanner";
import OfferPopupCount from "../../Components/Offer/OfferCountDown/OfferPopupCount";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [catValue, setCatValue] = useState("");

  const parser = new UAParser(navigator.userAgent);

  const { data:activeOfferData, isPending:pendigActive } = useQuery({
    queryKey: ["activeOffer"],
    queryFn: () => activeOffer(),
    refetchInterval: 1000,
  });

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

  // fetch data for product slider
  const { data: allData, isPending: allDataLoading } = useQuery({
    queryKey: ["ElectricItems"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });

  const elctric = allData?.filter((item) => item.category === "Electricals");
  const tools = allData?.filter((item) => item.category === "Tools");

  const plumbing = allData?.filter((item) => item.category === "Plumbing");

  return (
    <div className="w-full">
      {
        activeOfferData?.status === true && <OfferPopup data={activeOfferData} />
      }
      
      <Helmet>
        <title> Best Online Shop in Saudi Arabia</title>

        <meta
          name="description"
          content="Buy original products at best price with fast delivery"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://moom24.com/" />

        <meta property="og:title" content="Best Online Shop" />
        <meta property="og:description" content="Buy products online" />
        <meta property="og:image" content="https://moom24.com/cover.jpg" />
        <meta property="og:url" content="https://moom24.com/" />
      </Helmet>

      <Banner />
        {
        activeOfferData?.status === true &&  <OfferBanner data={activeOfferData}/>
      }
     
    <OfferPopupCount/>

      <CategoryHeader cat={catData} />
      {allData && (
        <>
          <CoverFLowSlider data={plumbing} />
          <ProductSlider data={elctric} title="Electricals Product" />
          <ProductSlider data={plumbing} title="Plumbing Product" />
          <ProductSlider data={tools} title="Tools Product" />
        </>
      )}

      <div className="w-full mx-auto mt-5  text-center bg-white">
        <ElectricItems />
      </div>
    </div>
  );
};

export default Home;
