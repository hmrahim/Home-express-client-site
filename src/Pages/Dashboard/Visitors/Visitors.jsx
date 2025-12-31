import React, { useState } from "react";
import VisitorInfo from "./VisitorInfo";
import PreBackButton from "../../Components/PreBackButton";
import { useQuery } from "@tanstack/react-query";
import { getVisitor } from "../../../api/AllApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaDesktop,
  FaMobileAlt,
  FaClock,
  FaServer,
  FaNetworkWired,
} from "react-icons/fa";

const Visitors = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const date = new Date(startDate).toLocaleDateString("en-US");
  const { data, isPending } = useQuery({
    queryKey: ["getVisitors"],
    queryFn: () => getVisitor(date),
    refetchInterval: 1000,
  });

  const getVisitorsBydate = () => {};

  return (
    <div>
      <div className="bg-base-200  pt-10 px-5 md:px-0">
        <div className=" md:w-4/5 w-full  mx-auto py-5 bg-base-100 rounded-lg shadow-lg p-4 border border-success">
          <PreBackButton title="Visitors" />

            <hr className="h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
          <div className="mt-2 flex  justify-between items-center">
            <div className="flex flex-col justify-center">
              <label htmlFor="">Select Date</label>
              <div>
                <DatePicker
                  className="border-2 border-gray-600 px-2"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />{" "}
              </div>
            </div>
            <h1 className="text-2xl font-bold">Total Visitors:- {data?.length}</h1>
          </div>

          <div className=" grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {data?.map((visitor) => {
              const date = new Date(visitor?.visitedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              );
              return (
                <div class="relative">
                  <input type="checkbox" id="visitor1" class="peer hidden" />
                  {/* <!-- Card --> */}
                  <label
                    onClick={() => setSelectedVisitor(visitor)}
                    for="visitor1"
                    class="block cursor-pointer rounded-xl p-6 shadow-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-primary hover:to-green-500 hover:scale-105 transform transition"
                  >
                    <div class="flex items-center space-x-3">
                      <i class="fas fa-network-wired text-2xl">
                        <FaNetworkWired />{" "}
                      </i>
                      <div>
                        <div class="font-semibold text-lg">{visitor?.ip}</div>
                        <div class="text-sm opacity-80">
                          {visitor?.location.city} | |{" "}
                          <span>{date && date}</span>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* <!-- Modal / Expanded Content --> */}
                  <div class="fixed inset-0 bg-black bg-opacity-50 hidden peer-checked:flex items-center justify-center z-50 p-4">
                    <div class="bg-gray-100 rounded-2xl max-w-4xl w-full p-6 relative overflow-auto max-h-[90vh]">
                      {/* <!-- Close Button --> */}
                      <label
                        onClick={() => setSelectedVisitor(null)}
                        for="visitor1"
                        class="absolute top-4 right-4 text-gray-700 text-2xl font-bold cursor-pointer hover:text-gray-900"
                      >
                        &times;
                      </label>

                      <h2 class="text-2xl font-bold mb-6 text-gray-800">
                        Visitor Details
                      </h2>

                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* <!-- IP Card --> */}
                        <div class="bg-gradient-to-r from-purple-400 to-indigo-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-network-wired text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">IP</div>
                            <div class="font-semibold">
                              {selectedVisitor?.ip}
                            </div>
                          </div>
                        </div>

                        {/* <!-- Location Card --> */}
                        <div class="bg-gradient-to-r from-green-400 to-teal-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-map-marker-alt text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">Location</div>
                            <div class="font-semibold">
                              {selectedVisitor?.location.city},{" "}
                              {selectedVisitor?.location.region},{" "}
                              {selectedVisitor?.location.country}
                            </div>
                            <div class="text-xs mt-1">
                              Lat/Lng: {selectedVisitor?.location.loc}
                            </div>
                          </div>
                        </div>

                        {/* <!-- Browser Card --> */}
                        <div class="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-globe text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">Browser</div>
                            <div class="font-semibold">
                              {selectedVisitor?.userAgent.browserName}
                            </div>
                            <div class="text-xs mt-1">
                              Version:{" "}
                              {selectedVisitor?.userAgent.browserVersion}
                            </div>
                          </div>
                        </div>

                        {/* <!-- OS Card --> */}
                        <div class="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-desktop text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">OS</div>
                            <div class="font-semibold">
                              {selectedVisitor?.userAgent.os}
                            </div>
                            <div class="text-xs mt-1">
                              {selectedVisitor?.userAgent.osVersion}
                            </div>
                          </div>
                        </div>

                        {/* <!-- Device Card --> */}
                        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-mobile-alt text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">Device</div>
                            <div class="font-semibold">
                              {selectedVisitor?.userAgent.deviceType}
                            </div>
                            <div class="text-xs mt-1">
                              Vendor: {selectedVisitor?.userAgent.deviceVendor}
                            </div>
                          </div>
                        </div>

                        {/* <!-- ISP / Org Card --> */}
                        <div class="bg-gradient-to-r from-purple-400 to-indigo-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-server text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">ISP / Org</div>
                            <div class="font-semibold">
                              {selectedVisitor?.location.org}
                            </div>
                          </div>
                        </div>

                        {/* <!-- Timezone Card --> */}
                        <div class="bg-gradient-to-r from-blue-300 to-teal-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                          <i class="fas fa-clock text-xl"></i>
                          <div>
                            <div class="text-sm font-medium">Timezone</div>
                            <div class="font-semibold">
                              {selectedVisitor?.location.timezone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitors;
