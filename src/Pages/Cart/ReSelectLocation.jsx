import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useContext, useState } from "react";
import { MdCancel } from "react-icons/md";
import CustomerLocation from "../Dashboard/Customers-Dashboard/CustomerLocation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserLocation, updateLocation } from "../../api/AllApi";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/features/location/locationSlice";

export default function ReSelectLocation({ isOpen, setIsOpen, data }) {
  const { email } = useContext(AuthContext);
const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  const { data: address, isPending: addresPending } = useQuery({
    queryKey: ["getUserLocation"],
    queryFn: () => getUserLocation(location.lat, location.lng),
    refetchInterval: 1000,
  });
  
  

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const items = {
    ...address?.data,
    name: data?.address.name,
    phone: data?.address.phone,
    location: location,
  };

  const mutation = useMutation({
    mutationFn: () => updateLocation(items, email),
    onSuccess: (res) => {
      if (res.status === 200) {
        close();
        Swal.fire({
          title: "Address Updated",
          icon: "success",
          draggable: true,
        });
      }
    },
  });

  const updateAddress = () => {
    mutation.mutate();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <CustomerLocation setLocation={setLocation} />
              <div className="flex flex-col">
                {addresPending ? (
                  "Loading..."
                ) : (
                  <p className="text-base font-medium text-gray-800 leading-relaxed">
                    {address?.data.address?.road},{" "}
                    {address?.data.address?.suburb},{" "}
                    {address?.data.address?.postcode},{" "}
                    {address?.data.address?.state},{" "}
                    {address?.data.address?.city},{" "}
                    {address?.data?.address.country}
                  </p>
                )}

                <button
                  onClick={updateAddress}
                  className="btn btn-primary mt-5"
                >
                  {
                    mutation.isPending ? "Updating..." : "Update"
                  }
                  
                </button>
              </div>

              <div className="mt-4">
                <Button
                  className="absolute top-0 right-0 inline-flex items-center gap-2 rounded-md bg-red-00 px-3 py-1.5 text-2xl font-semibold text-red-500 shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={close}
                >
                  <MdCancel />
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
