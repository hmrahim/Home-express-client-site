import React from "react";
import LoadingSpiner from "../Components/Loader/LoadingSpiner";

const ViewShippingAddress = ({data,isPending}) => {
  
    
  return (
    <div class="max-w-xl w-full bg-white rounded-2xl shadow-md p-6 mt-3 space-y-4">

    
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-black">Shipping Address</h2>

 

        <label
          for="editAddress"
          class="text-sm text-primary cursor-pointer hover:underline peer-checked:hidden"
        >
          Edit
        </label>

      
      </div>

    {
        isPending ? <LoadingSpiner/> : 
   
      <div class="space-y-1 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2">
        <p>
          <span class="font-medium">Name: </span> {data?.address.name}
        </p>
        <p>
          <span class="font-medium">Phone: </span> {data?.address.phone}
        </p>
        <p>
          <span class="font-medium">Address: </span> {data?.address.suburb}
        </p>
        <p>
          <span class="font-medium">City: </span> {data?.address.city ? data?.address.city : data?.address.state}
        </p>
        <p>
          <span class="font-medium">Postal Code: </span>{data?.address.postcode}
        </p>
        <p>
          <span class="font-medium">Country: </span>{data?.address.country}
        </p>
      </div>
       }

    
    </div>
  );
};

export default ViewShippingAddress;
