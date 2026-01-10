import React, { useContext, useState } from "react";
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
import OrderSummery from "./OrderSummery";
import { AuthContext } from "../Dashboard/AuthClient/AuthContext";

const Cart = () => {
  const User = useAuthState(auth);
  const email = User[0]?.email;
  const { pathname } = useLocation();

  const { data:cart, isPending, refetch } = useQuery({
    queryKey: ["allcart", email],
    queryFn: () => fetchCart(email),
    refetchInterval: 1000,
  });



  const checkOut = (data) => {
    if (cart.data.length <= 0) {
      toast.warning("add product", {
        autoClose: 1000,
      });
    } else {
      Navigate(`/confrim-checkout`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 mt-16 md:mt-16 font-serif">
      <div className=" md:w-4/5 mx-auto flex flex-col flex-col-reverse md:flex-row  justify-around  py-5 gap-5 ">
        <div className=" bg-gradient-to-r from-green-500 to-emerald-600 text-white md:w-full w-full rounded-lg  md:px-0">
          {cart?.length === 0 ? (
            <div className="flex justify-center items-center flex-col">
              <img
                className=""
                src=""
                alt=""
              />
              <h1 className="text-4xl font-bold my-10 shadow-xl p-4">
                Your cart is empty
              </h1>
            </div>
          ) : (
            <>
              {pathname === "/cart" ? (
                <CartDetails
                  data={cart?.data}
                  title="Cart Details"
                  isPending={isPending}
                  refetch={refetch}
                  totalAmount={cart?.totalAmount}
                />
              ) : (
                <Outlet />
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer autoClose="1000" />
    </div>
  );
};

export default Cart;
