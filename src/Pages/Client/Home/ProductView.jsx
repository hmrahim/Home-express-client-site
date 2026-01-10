import React, { useContext, useEffect, useState } from "react";

import currency from "../../../assets/Saudi_Riyal_Symbol-1.png";
import { Link, useParams } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiGhostSmileLine } from "react-icons/ri";
import { GiStrong } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import AuthClient from "../../Dashboard/AuthClient/AuthClient";
import { AuthContext } from "../../Dashboard/AuthClient/AuthContext";
import { Helmet } from "react-helmet-async";
import { addToCartData, getProductById } from "../../../api/AllApi";
import Loader from "../../Components/Loader/Loader";
import ProductImageSlider from "../../Components/ProductImageSlider";
import ProductViewVariant from "./ProductViewVariant";
const ProductView = () => {
  const { email, rol } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [vPrice, setVPrice] = useState("");
  const { id } = useParams();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getProductById", id],
    queryFn: () => getProductById(id),
    refetchInterval: 1000,
  });

  const [count, setCount] = useState(Number(data?.minQty) || 1);
  const [size, setSize] = useState(data?.variants && data?.variants[0]?.size);
  const [color, setColor] = useState("");

  useEffect(() => {
    if(data?.variants){
      setSize(data?.variants[0]?.size)
    }
    if (data?.minQty) {
      setCount(Number(data.minQty));
    }
  }, [data]);
  // console.log(minQty);

  const qty = count;

  const discoun = (Number(data?.price) * data?.discount) / 100;
  const discountPrice = Number(data?.price) - discoun;

  const incress = () => {
    if (qty <= 0) {
      return false;
    } else {
      setCount(qty + 1);
    }
  };
  const decress = () => {
    if (qty <= Number(data?.minQty)) {
      return false;
    } else {
      setCount(qty - 1);
    }
  };
  const mutation = useMutation({
    mutationFn: (items) => addToCartData(items),
    onSuccess: (res) => {
      if (res.data.error === 400) {
        return toast.error("Product already added", { autoClose: 1000 });
      }
      toast.success("Product added to cart", { autoClose: 1000 });
    },
  });
  const addToCart = async () => {
    const items = {
      name: data?.name,
      id: data?._id,
      email: email,
      price: data?.price,
      discount: data?.discount,
      quantity: count,
      minQty: data?.minQty,
      image: data?.image,
    };

    mutation.mutate(items);
  };

  const [int, dec] = Number(discountPrice).toFixed(2).split(".");
  const [p_int, p_dec] = Number(data?.price).toFixed(2).split(".");

  const variant = data?.variants?.find((item) => item.size === size);
  const var_discount = (Number(variant?.price) * Number(data?.discount)) / 100;
  const var_amount_with_dis = Number(variant?.price) - var_discount;

  const [V_D_int, V_D_dec] = Number(var_amount_with_dis).toFixed(2).split(".");

  const [V_p_int, V_p_dec] = Number(variant?.price).toFixed(2).split(".");

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-11/12 mx-auto my-20  text-center bg-base-200 ">
        <Helmet>
          <title>Moom24-{`${data?.name}`}</title>
        </Helmet>
        <div className="shadow-md flex flex-col md:flex-row  md:justify-around pt-4 bg-base-100 rounded-md pb-3 px-4">
          <div className=" md:-[80%] bg-white flex flex-col">
            <div className="flex flex-col md:flex-row gap-2">
              <AuthClient modal={modal} setModal={setModal} />
              <div className="">
                {data?.variants[0] !== undefined ? (
                  <ProductImageSlider
                    variants={data?.variants}
                    MainPrice={data.price}
                    quantity={data.quantity}
                  />
                ) : (
                  <img className="w-96 h-96" src={data?.image} alt="" />
                )}
              </div>
              <div className="md:w-[50%] bg-white flex flex-col gap-10">
                <h1 className="text-2xl font-semibold text-left">
                  {data?.name}
                </h1>{" "}
                <div>
                  <p className="text-left ">Brand: {data?.brand}</p>
                  <p className="text-left ">
                    Menufacturer country : {data?.country}
                  </p>
                  <p className="text-left ">
                    Minimum Order Quantity : {data?.minQty} Pieces for this
                    items.
                  </p>
                  <p className="text-left ">Product Unit : {data?.unit}</p>

                  <ProductViewVariant variant={variant} />

                  <>
                    {data?.discount ? (
                      <h2 className="text-left text-5xl flex gap-2 items-center font-bold my-4">
                        <img src={currency} className="w-10 h-w-10" alt="" />

                        {data?.variants[0] !== undefined ? (
                          <div className="flex items-center">
                            <p>{V_D_int}</p>
                            {V_D_dec > 0 && (
                              <p className="font-normal text-[18px]">
                                .{V_D_dec}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p>{int}</p>
                            {dec > 0 && (
                              <p className="font-normal text-[18px]">.{dec}</p>
                            )}
                          </div>
                        )}
                      </h2>
                    ) : (
                      <h2 className="text-left text-5xl flex gap-2 items-center font-bold my-4">
                        <img src={currency} className="w-10 h-w-10" alt="" />

                        {data?.variants[0] !== undefined ? (
                          <div className="flex items-center">
                            <p>{V_p_int}</p>
                            {V_D_dec > 0 && (
                              <p className="font-normal text-[18px]">
                                .{V_D_dec}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p>{p_int}</p>
                            {p_dec > 0 && (
                              <p className="font-normal text-[18px]">
                                .{p_dec}
                              </p>
                            )}
                          </div>
                        )}
                      </h2>
                    )}
                  </>

                  <></>

                  <p className="flex">
                    {data?.discount ? (
                      <del className="to-gray-600 flex  font-semibold items-center gap-2">
                        <img src={currency} className="w-5 h-5" alt="" />
                        <p className="text-gray-600 text-xl">
                          {data?.variants[0] !== undefined
                            ? variant?.price
                            : data?.price}
                        </p>
                      </del>
                    ) : (
                      ""
                    )}

                    {data?.discount ? (
                      <span className="text-xl text-black border border-primary px-2   py-0 ml-4">
                        -{data?.discount}%
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <div>
                    {data?.variants[0] !== undefined && (
                      <h2 className="text-xl font-semibold text-start">
                        {" "}
                        Select Size
                      </h2>
                    )}
                    <div class="flex  gap-2 p-2">
                      {data?.variants.map((items, index) => {
                        return (
                          <div key={items?._id}>
                            <input
                              class="peer sr-only"
                              value={items?.size}
                              name="size"
                              id={items?.size}
                              type="radio"
                              checked={size === items?.size}
                              onChange={() => setSize(items?.size)}
                            />
                            <div class="flex h-10 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-green-400 active:scale-95 peer-checked:border-green-500 peer-checked:shadow-lg peer-checked:shadow-green-400">
                              <label
                                class="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-green-500"
                                for={items?.size}
                              >
                                {items?.size}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    {data?.variants[0] !== undefined && (
                      <h2 className="text-xl font-semibold text-start">
                        {" "}
                        Select Color
                      </h2>
                    )}
                    <div class="flex  gap-2 p-2">
                      {data?.variants.map((items, index) => {
                        return (
                          <div key={items?._id}>
                            <input
                              class="peer sr-only"
                              value={items?.color}
                              name="color"
                              id={items?.color}
                              type="radio"
                              checked={color === items?.color}
                              onChange={() => setColor(items?.color)}
                            />
                            <div
                              class={`flex h-10 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-${color}-300 bg-${items?.color.toLocaleLowerCase()}-500 bg-${items?.color.toLocaleLowerCase()} p-1 transition-transform duration-150 hover:border-green-400 active:scale-95 peer-checked:border-green-500 peer-checked:shadow-xl peer-checked:shadow-green-400`}
                            >
                              <label
                                class={`flex cursor-pointer items-center justify-center text-sm uppercase text-white peer-checked:text-green-500`}
                                for={items?.color}
                              >
                                {items?.color}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-32 rounded-xl  flex border ">
                  <button
                    onClick={decress}
                    className="btn btn-square font-bold text-3xl bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    -
                  </button>
                  <input
                    type=""
                    disabled
                    value={count}
                    className="outline-0  text-center h-11 w-10  "
                  />
                  <button
                    onClick={incress}
                    className="btn btn-square  font-bold text-3xl bg-gradient-to-r from-green-500 to-emerald-600"
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-5">
                  <Link
                    className="btn  rounded-none md:px-20 btn-error"
                    disabled
                  >
                    Buy Now
                  </Link>
                  {email ? (
                    <button
                      onClick={addToCart}
                      className="btn  rounded-none md:px-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    >
                      {mutation.isPending ? "Loading..." : "Add To Cart"}
                    </button>
                  ) : (
                    <label
                      onClick={() => modal === false && setModal(true)}
                      className="btn rounded-none md:px-20 btn-primary text-center"
                    >
                      Add To Cart
                    </label>
                  )}
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
            <p className="text-justify ">{data?.desc}</p>
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
