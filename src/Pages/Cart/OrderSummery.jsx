import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSummery = ({ data, totalAmount }) => {
  const { pathname } = useLocation();
  return (
    <div className="bg-white text-green-700 rounded-2xl shadow p-2 h-fit mx-5 md:mx-0 mt-2">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{totalAmount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>0.00</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{totalAmount ? totalAmount : "0.00"}</span>
        </div>
        {pathname === "/cart/payment" ? (
          <div className="mt-5 flex gap-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 transition">
              Apply
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {pathname === "/cart" ? (
        <Link
          disabled={data ? false : true}
          to="/cart/customar-info"
          className="mt-6 btn btn-sm w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white  rounded-xl  font-semibold transition"
        >
          Checkout
        </Link>
      ) : (
        ""
      )}

      <p className="text-xs text-gray-500 text-center mt-3">
        Your payment information is secure
      </p>
    </div>
  );
};

export default OrderSummery;
