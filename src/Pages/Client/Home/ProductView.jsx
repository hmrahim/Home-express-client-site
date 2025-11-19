import React, { useState } from "react";
import image from "../../../assets/cat-3.jpg";
import currency from "../../../assets/Saudi_Riyal_Symbol-1.png";
import { Link, useParams } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiGhostSmileLine } from "react-icons/ri";
import { GiStrong } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ToastContainer, toast } from "react-toastify";
const ProductView = () => {
  const User = useAuthState(auth);
  const email = User[0]?.email;
  const [quty, setQty] = useState("");

  const [count, setCount] = useState("1");
  const qty = Number(count);
  const { id } = useParams();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["productbyid"],
    queryFn: () =>
      axios.get(`https://server-site-psi-inky.vercel.app/api/product/${id}`),
  });
  const product = data?.data;
  const discoun = (Number(product?.price) * product?.discount) / 100;
  const discountPrice = Math.round(Number(product?.price) - discoun);

  const incress = () => {
    if (qty <= 0) {
      return false;
    } else {
      setCount(qty + 1);
    }
  };
  const decress = () => {
    if (qty <= 1) {
      return false;
    } else {
      setCount(qty - 1);
    }
  };

  const addToCart = async () => {
    const items = {
      name: data.data.name,
      id: data.data._id,
      email: email,
      price: data.data.price,
      discount: data.data.discount,
      quantity: count,
      image: data.data.image,
    };

    const res = await axios.post("https://server-site-psi-inky.vercel.app/api/cart", items);
    if (res.data.error === 400) {
      toast.error(res.data.message);
    }
    if (res.data.success === 200) {
      toast.success(res.data.message);
    }
  };

  return (
    <div>
      <div className="w-11/12 mx-auto my-20  text-center bg-base-200 ">
        <div className="shadow-md flex flex-col md:flex-row  md:justify-around pt-4 bg-base-100 rounded-md pb-3 px-4">
          <div className=" md:-[80%] bg-white flex flex-col">
            <div className="flex flex-col md:flex-row">
              <div>
                <img className="w-96 h-96" src={product?.image} alt="" />
              </div>
              <div className="md:w-[50%] bg-white flex flex-col gap-10">
                <h1 className="text-2xl font-semibold text-left">
                  {product?.name}
                </h1>{" "}
                <div>
                  <p className="text-left">Category: {product?.category}</p>
                  <p className="text-left ">Brand: {product?.brand}</p>
                  <p className="text-left ">
                    Menufacturer country : {product?.country}
                  </p>
                  {product?.discount ? (
                    <h2 className="text-left text-5xl flex gap-2 items-center font-bold my-4">
                      <img src={currency} className="w-10 h-w-10" alt="" />

                      {discountPrice}
                      <sub className="text-xl">SAR</sub>
                    </h2>
                  ) : (
                    <h2 className="text-left text-5xl flex gap-2 items-center font-bold my-4">
                      <img src={currency} className="w-10 h-w-10" alt="" />

                      {product?.price}
                      <sub className="text-xl">SAR</sub>
                    </h2>
                  )}

                  <p className="flex">
                    {product?.discount ? (
                      <del className="to-gray-600 flex  font-semibold items-center gap-2">
                        <img src={currency} className="w-5 h-5" alt="" />
                        <p className="text-gray-600 text-xl">
                          {" "}
                          {product?.price}
                        </p>
                      </del>
                    ) : (
                      ""
                    )}

                    {product?.discount ? (
                      <span className="text-xl text-black border border-primary px-2   py-0 ml-4">
                        -{product?.discount}%
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <div className="w-32 rounded-xl  flex border ">
                  <button
                    onClick={decress}
                    className="btn btn-square font-bold text-3xl btn-primary"
                  >
                    -
                  </button>
                  <input
                    type=""
                    disabled
                    value={count}
                    className="outline-0 text-center h-11 w-10  "
                  />
                  <button
                    onClick={incress}
                    className="btn btn-square  font-bold text-3xl btn-primary"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-5">
                  <Link className="btn  rounded-none md:px-20 btn-error">
                    Buy Now
                  </Link>
                  <button
                    onClick={addToCart}
                    className="btn  rounded-none md:px-20 btn-primary"
                  >
                    Add TO cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-[20%] bg-gray-100 my-5 md:my-0 p-5">
            <div>
              <h3 className="text-left ml-3 text-gray-500">Delivery Options</h3>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <MdAddLocationAlt />
                </span>
                <p>Riyadh, Saudi Arabia</p>
              </div>
              <hr className="mt-1" />
              <h3 className="text-left ml-3 text-gray-500">
                Return & Warranty{" "}
              </h3>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <FaHandHoldingHeart />
                </span>
                <p>Change of Mind</p>
              </div>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <RiGhostSmileLine />
                </span>
                <p>15 days easy return</p>
              </div>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <GiStrong />
                </span>
                <p>Warranty available</p>
              </div>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <CiDeliveryTruck />
                </span>
                <p>Fast Home Delivery</p>
              </div>
              <hr className="mt-1" />
              <h3 className="text-left ml-3 text-gray-500">Payment Methods </h3>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <BsCashCoin />
                </span>
                <p>
                  Cash on delivery <br /> Cash Payment
                </p>
              </div>
              <div className="flex  items-center text-xs gap-2 mt-2">
                <span className="text-xl ml-1">
                  <FaCcMastercard />
                </span>
                <p>Card Payment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className=" px-4">
            <p className="text-justify ">{product?.desc}</p>
          </div>
          <div className="bg-base-300  mt-5">
            <h1 className="text-2xl text-gray-700 py-2 font-semibold  w-full">
              Customar Reviesws
            </h1>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductView;
