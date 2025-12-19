import React from "react";

const OrderTracker = ({ order }) => {
  const date = new Date(order?.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="font-sans">
      {/* <!-- Card --> */}
      <div className="bg-base-300 w-full mt-7 ">
        {/* <!-- Header --> */}
        <div className="flex justify-between items-start mb-10 bg-primary w-full p-2">
          <h2 className="font-bold text-gray-800">
            ORDER <span className="text-white">{order?.orderNo}</span>
          </h2>

          <div className="text-right text-sm text-white">
            <p>Expected Arrival {date && date}</p>
          </div>
        </div>

        <div className="relative mb-14 pr-2 pl-2">
          <div className="absolute top-5 left-0 right-0 h-2 bg-indigo-300 rounded-full mx-2"></div>

          {/* <!-- Active Line --> */}
          <div
            className={`
            absolute top-5 left-0 h-2 bg-green-600 rounded-full  ml-2
            ${order?.status === "pending" ? "w-1/3" : ""}
            ${order?.status === "confirmed" ? "w-2/3" : ""}
            ${order?.status === "delivered" ? "w-11/12" : ""}
            `}
          ></div>

          {/* <!-- Steps --> */}
          <div className="relative flex justify-between">
            {/* <!-- Step 1 --> */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  order?.status === "pending" || "confirmed"
                    ? "bg-green-600"
                    : "bg-indigo-300"
                }   flex items-center justify-center text-white font-bold`}
              >
                {order?.status === "pending" || "confirmed" ? (
                  " ✓ "
                ) : (
                  <span className="loading loading-ring loading-md"></span>
                )}
              </div>
            </div>

            {/* <!-- Step 2 --> */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  order?.status === "confirmed"
                    ? "bg-green-600"
                    : "bg-indigo-300"
                }   flex items-center justify-center text-white font-bold`}
              >
                {order?.status ===  "confirmed" ? (
                  " ✓ "
                ) : (
                  <span className="loading loading-ring loading-md"></span>
                )}
              </div>
            </div>

            {/* <!-- Step 3 --> */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  order?.status === "confirmed"
                    ? "bg-green-600"
                    : "bg-indigo-300"
                }   flex items-center justify-center text-white font-bold`}
              >
                {order?.status === "confirmed" ? (
                  " ✓ "
                ) : (
                  <span className="loading loading-ring loading-md"></span>
                )}
              </div>
            </div>

            {/* <!-- Step 4 --> */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  order?.status === "delivered"
                    ? "bg-green-600"
                    : "bg-indigo-300"
                }   flex items-center justify-center text-white font-bold`}
              >
                {order?.status === "deivered" ? (
                  " ✓ "
                ) : (
                  <span className="loading loading-ring loading-md"></span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Labels --> */}
        <div className="grid grid-cols-4 gap-4 text-center">
          {/* <!-- Processed --> */}
          <div
            className={` ${
              order?.status === "pending" || "confirmed"
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            <svg
              className="mx-auto mb-2"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2"></rect>
              <path d="M8 2v4M16 2v4M8 14l2 2 4-4"></path>
            </svg>
            <p className="text-sm font-semibold">Order Processed</p>
          </div>

          {/* <!-- Shipped --> */}
          <div
            className={` ${
              order?.status === "confirmed" ? "text-green-500" : "text-gray-400"
            }`}
          >
            <svg
              className="mx-auto mb-2"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 7h13v10H3z"></path>
              <path d="M16 10h4l3 3v4h-7z"></path>
              <circle cx="7.5" cy="17.5" r="1.5"></circle>
              <circle cx="17.5" cy="17.5" r="1.5"></circle>
            </svg>
            <p className="text-sm font-semibold">Order Shipped</p>
          </div>

          {/* <!-- En Route --> */}
          <div
            className={` ${
              order?.status === "confirmed" ? "text-green-500" : "text-gray-400"
            }`}
          >
            <svg
              className="mx-auto mb-2"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M1 16l4-4"></path>
              <path d="M5 12h14"></path>
              <rect x="3" y="6" width="13" height="7"></rect>
            </svg>
            <p className="text-sm font-semibold"> on the way</p>
          </div>

          {/* <!-- Arrived --> */}
          <div
            className={` ${
              order?.status === "delivered" ? "text-green-500" : "text-gray-400"
            }`}
          >
            <svg
              className="mx-auto mb-2"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M3 9l9-7 9 7"></path>
              <path d="M9 22V12h6v10"></path>
            </svg>
            <p className="text-sm font-semibold">Order Arrived</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
