import React from "react";
import CartList from "./CartList";
import Loader from "../Components/Loader/Loader";
import OrderSummery from "./OrderSummery";

const CartDetails = ({ data, title, isPending, refetch,totalAmount }) => {
  // console.log(data);
  return (
    <div className="">
      <h1 className="text-2xl text-center font-semibold mt-5">Cart Details</h1>{" "}
      <hr classNamep="h-1 bg-primary mb-3" />
      {data?.[0] ? (
        <div className="w-full flex gap-5 flex-col-reverse  items-start flex-col md:flex-row md:p-4">
          <div
            className="w-full md:w-3/5 overflow-x-scroll flex justify-center items-center 
             [&::-webkit-scrollbar]:h-2 
          [&::-webkit-scrollbar]:w-1 
          [&::-webkit-scrollbar]:bg-white 
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 
          "
          >
            {isPending ? (
              <Loader display={``} />
            ) : (
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-white">
                    <th className="text-center">Image</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Qty </th>
                    <th className="text-center">Total Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((cart) => (
                    <CartList key={cart._id} cart={cart} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-full md:w-2/5">
            <OrderSummery data={data} totalAmount={totalAmount.toFixed(2)} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CartDetails;
