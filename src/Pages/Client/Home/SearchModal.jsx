import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import InitialSearchComponent from "../../Components/initialSearchCom/InitialSearchComponent";

export default function SearchModal({ isOpen, setIsOpen }) {
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
        <div className="fixed inset-0 z-10  overflow-y-auto top-10 md:top-0">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full h-[500px]  rounded-xl  border-primary bg-gray-300  backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
             
              {/* content will be here */}
              <div>
                <InitialSearchComponent />
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
