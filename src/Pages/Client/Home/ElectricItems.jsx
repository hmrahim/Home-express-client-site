import React, { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle";

import ProductCard from "../../Components/ProductCard";
import SeeAll from "../../Components/SeeAll";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchProductForUser, infiniteScroll } from "../../../api/AllApi";
import CardLoader from "../../Components/CardLoader";
import { Helmet } from "react-helmet-async";
import { InView, useInView } from "react-intersection-observer";
import LoadingSpiner from "../../Components/Loader/LoadingSpiner";

const ElectricItems = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["ElectricItems"],
    queryFn: fetchProductForUser,
    refetchInterval: 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "150px",
  });

  const {
    data: scroll,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteScroll"],
    queryFn: infiniteScroll,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
  });

  // useEffect(() => {
  //   if ((InView && hasNextPage)) {
  //     fetchNextPage();
  //   }
  // }, [InView, hasNextPage, fetchNextPage]);

  // const handleScroll = () => {
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 200;
  //     if(bottom && hasNextPage && !isFetchingNextPage){
  //       fetchNextPage();
  //     }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isBottom =
        Math.ceil(scrollTop + windowHeight) >= documentHeight - 800;

      if (isBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const electric = data?.filter((elec) => elec.category === "Electricals");

  return (
    <div className="flex flex-col justify-center">
      <div className="container mx-auto  lg:px-6  my-10  text-center bg-white ">
        <div className="shadow-md  bg-slate-300 rounded-md pb-3 px-4">
          {isPending ? (
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
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </div>
          ) : (
            <div
              className="grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      sm:gap-5
      md:gap-6  my-2 py-4 "
            >
              <>
                
                {scroll?.pages.map((page) =>
                  page?.data.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </>
            </div>
          )}
        </div>

      
      </div>
      <div className="h-16 w-full flex justify-center items-center">
        {isFetchingNextPage && <LoadingSpiner />}
      </div>
    </div>
  );
};

export default ElectricItems;
