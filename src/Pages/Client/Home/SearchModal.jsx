import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import InitialSearchComponent from "../../Components/initialSearchCom/InitialSearchComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchSeacrhProduct } from "../../../api/AllApi";
import ProductCard from "../../Components/ProductCard";

export default function SearchModal({ isOpen, setIsOpen }) {
   const searchQuery = useSelector((state) => state.searchSlice.searchQuery);

   const {data,isPending} = useQuery({
    queryKey: ['searchResults', searchQuery],
    queryFn:()=> fetchSeacrhProduct(searchQuery),
    refetchInterval:1000
   })
   
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10  overflow-y-auto top-16 md:top-16">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full min-h-[500px]  rounded-xl  border-primary bg-gray-300  backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
             
              {/* content will be here */}
              <h1 className="text-center text-2xl font-bold mt-4">Search for:-{searchQuery}</h1>
              <div>
                  <div
                              className="w-full grid
                      grid-cols-2
                      sm:grid-cols-3
                      md:grid-cols-4
                      lg:grid-cols-5
                      xl:grid-cols-5
                      gap-4
                      sm:gap-5
                      md:gap-6  my-2 py-4 "
                            >
                              <>
                                
                                {
                                  data?.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                  ))
                                }
                              </>
                            </div>
                {/* <InitialSearchComponent /> */}
              </div>
              {/* <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
