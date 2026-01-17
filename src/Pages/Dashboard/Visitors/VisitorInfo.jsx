import React, { useState } from "react";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaDesktop,
  FaMobileAlt,
  FaClock,
  FaServer,
  FaNetworkWired,
} from "react-icons/fa";
const VisitorInfo = ({visitor}) => {

    const [selectedVisitor,setSelectedVisitor] = useState(null)



  return (
    <div className="relative">
          <input type="checkbox" id="visitor1" className="peer hidden" />
          {/* <!-- Card --> */}
          <label
          onClick={()=> setSelectedVisitor(visitor)}
            for="visitor1"
            className="block cursor-pointer rounded-xl p-6 shadow-lg text-white bg-gradient-to-r from-[#043915] to-[#4C763B] hover:from-primary hover:to-green-500 hover:scale-105 transform transition"
          >
            <div className="flex items-center space-x-3">
                 <i className="fas fa-network-wired text-2xl"><FaNetworkWired/> </i>
              <div>
                <div className="font-semibold text-lg">{visitor?.ip}</div>
                <div className="text-sm opacity-80">{visitor?.location.city}</div>
              </div>
            </div>
          </label>

          {/* <!-- Modal / Expanded Content --> */}
          <div className="fixed inset-0 bg-black bg-opacity-50 hidden peer-checked:flex items-center justify-center z-50 p-4">
            <div className="bg-gray-100 rounded-2xl max-w-4xl w-full p-6 relative overflow-auto max-h-[90vh]">
              {/* <!-- Close Button --> */}
              <label
              onClick={()=> setSelectedVisitor(null)}
                for="visitor1"
                className="absolute top-4 right-4 text-gray-700 text-2xl font-bold cursor-pointer hover:text-gray-900"
              >
                &times;
              </label>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Visitor Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <!-- IP Card --> */}
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-network-wired text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">IP</div>
                    <div className="font-semibold">{selectedVisitor?.ip}</div>
                  </div>
                </div>

                {/* <!-- Location Card --> */}
                <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">Location</div>
                    <div className="font-semibold">{selectedVisitor?.location.city}, {selectedVisitor?.location.region}, {selectedVisitor?.location.country}</div>
                    <div className="text-xs mt-1">Lat/Lng: {selectedVisitor?.location.loc}</div>
                  </div>
                </div>

                {/* <!-- Browser Card --> */}
                <div className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-globe text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">Browser</div>
                    <div className="font-semibold">{selectedVisitor?.userAgent.browserName}</div>
                    <div className="text-xs mt-1">Version: {selectedVisitor?.userAgent.browserVersion}</div>
                  </div>
                </div>

                {/* <!-- OS Card --> */}
                <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-desktop text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">OS</div>
                    <div className="font-semibold">{selectedVisitor?.userAgent.os}</div>
                    <div className="text-xs mt-1">{selectedVisitor?.userAgent.osVersion}</div>
                  </div>
                </div>

                {/* <!-- Device Card --> */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-mobile-alt text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">Device</div>
                    <div className="font-semibold">{selectedVisitor?.userAgent.deviceType}</div>
                    <div className="text-xs mt-1">Vendor: {selectedVisitor?.userAgent.deviceVendor}</div>
                  </div>
                </div>

                {/* <!-- ISP / Org Card --> */}
                <div className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-server text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">ISP / Org</div>
                    <div className="font-semibold">
                      {selectedVisitor?.location.org}
                    </div>
                  </div>
                </div>

                {/* <!-- Timezone Card --> */}
                <div className="bg-gradient-to-r from-blue-300 to-teal-400 text-white p-4 rounded-xl shadow hover:scale-105 transform transition flex items-center space-x-3">
                  <i className="fas fa-clock text-xl"></i>
                  <div>
                    <div className="text-sm font-medium">Timezone</div>
                    <div className="font-semibold">Asia/Riyadh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default VisitorInfo;
