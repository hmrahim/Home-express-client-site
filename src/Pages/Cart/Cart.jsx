import React, { useState } from "react";
import CartList from "./CartList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loader from "../Components/Loader/Loader";
import image from "../../../src/assets/cart.png";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CartDetails from "./CartDetails";
import { fetchCart } from "../../api/AllApi";

const Cart = () => {
  const User = useAuthState(auth);
  const email = User[0]?.email;
  const { pathname } = useLocation();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["allcart",email],
    queryFn: () => fetchCart(email),
    refetchInterval: 1000,
  });

  const withDscount = data?.filter((data) => data.discount !== "");
  const withoutDiscount = data?.filter((data) => data.discount === "");

  const amountWithOutDiscount = withoutDiscount?.reduce(
    (previousValue, currentValue) => {
      return (
        previousValue +
        Number(currentValue.price) * Number(currentValue.quantity)
      );
    },
    0
  );

  const discAmount = withDscount?.reduce((previousValue, currentValue) => {
    return (
      previousValue +
      (Number(currentValue.price) *
        Number(currentValue.quantity) *
        Number(currentValue.discount)) /
        100
    );
  }, 0);

  const totalAmount = withDscount?.reduce((previousValue, currentValue) => {
    return (
      previousValue + Number(currentValue.price) * Number(currentValue.quantity)
    );
  }, 0);

  const totalAmoutWithDIscountAndWithoutDiscount =
    totalAmount - discAmount + amountWithOutDiscount;
  const checkOut = (data) => {
    if (data.length <= 0) {
      toast.warning("add product",{
        autoClose:1000
      });
    } else {
      Navigate(`/confrim-checkout`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 mt-16 md:mt-16 font-serif">
      <div className="s-full md:w-5/6 mx-auto flex flex-col flex-col-reverse md:flex-row  justify-around  py-5 gap-5 px-5">
        <div className="bg-base-100 md:w-3/4 w-full md:px-5 rounded-lg px-4 md:px-0">
          {data?.length === 0 ? (
            <div className="flex justify-center items-center flex-col">
              <img
                className="max-h-[300px] max-w-[300px] "
                src={image}
                alt=""
              />
              <h1 className="text-4xl font-bold my-10 shadow-xl p-4">Your cart is empty</h1>
              

            </div>
          ) : (
            <>
              {pathname === "/cart" ? (
                <CartDetails
                  data={data}
                  title="Cart Details"
                  isPending={isPending}
                  refetch={refetch}
                />
              ) : (
                <Outlet />
              )}
            </>
          )}
        </div>

        <div className="bg-base-100 md:w-1/4 w-full px-2 rounded-lg">
          <h1 className="text-2xl text-center font-semibold mt-5">Summary</h1>
          <hr className="h-1 bg-primary mb-3" />
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              {" "}
              <p className="text-gray-500 font-semi">Sub Total </p>
              <p className="font-bold font-sans">
                {totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}
                <sub>sr</sub>
              </p>
            </div>
            <div className="flex justify-between">
              {" "}
              <p className="text-gray-500 font-semi">Shipping Fee </p>{" "}
              <p className="font-semibold">
                {0} <sub>sr</sub>
              </p>
            </div>
            <div className="flex gap-4 my-4 justify-center">
              <input
                type="text"
                placeholder="Type here"
                className="input input-xs w-4/5 rounded-none border border-primary p-2"
              />{" "}
              <button className="btn btn-primary btn-xs rounded-none">
                Apply
              </button>
            </div>
            <div className="flex justify-between">
              {" "}
              <p className="text-gray-500 font-semi">Total Amount</p>{" "}
              <p className="font-sans font-bold">
                {totalAmoutWithDIscountAndWithoutDiscount.toFixed(2)}
                <sub>sr</sub>
              </p>
            </div>
            <div className=" flex  justify-center  items-center my-4">
              {pathname !== "/cart" ? (
                " "
              ) : (
                <Link
                  to="/cart/customar-info"
                  className="btn btn-primary btn-sm text-xs w-full"
                >
                  Proced to checkout
                </Link>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose="1000" />
    </div>
  );
};

export default Cart;
