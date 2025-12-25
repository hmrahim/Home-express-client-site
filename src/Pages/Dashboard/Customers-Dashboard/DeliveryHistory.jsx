import React from "react";
import PreBackButton from "../../Components/PreBackButton";
import { Helmet } from "react-helmet-async";

const DeliveryHistory = () => {
  return (
    <div className="pt-4 px-5">
         <Helmet>
               <title>Delivery-History</title>
             </Helmet>
       <PreBackButton title="Delivery History"/> <hr className="h-1 bg-primary mb-4" />
      <main className="mx-auto max-w-6xl">
        <header className="flex flex-col items-center justify-between mb-6 ">
         
          <div className="flex flex-col items-center gap-3">
            <input
              type="search"
              placeholder="Search by order ID, rider, address..."
              className="rounded-lg border border-slate-700 bg-transparent px-4 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          {/* <!-- Filters --> */}
          <aside className="lg:col-span-1 bg-base-300 shadow-xl p-4 rounded-2xl max-h-52">
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <label className="block text-xs text-slate-400">Date range</label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="date"
                    className="w-1/2 rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-slate-100"
                  />
                  <input
                    type="date"
                    className="w-1/2 rounded-lg border border-slate-700 bg-transparent px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-900 font-semibold">
                  Apply
                </button>
              </div>
            </div>
          </aside>

          {/* <!-- Orders list --> */}
          <section className="lg:col-span-3 space-y-4">
            {/* <!-- Order item (use <details> so it works without JS) --> */}
            <details className="bg-base-300 list   shadow-xl p-4 rounded-2xl hover:bg-primary hover:text-white"  open>
              <summary className="flex items-center  justify-between cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-bold text-gray-950">
                    #A1
                  </div>
                  <div>
                    <div className="font-semibold">Order #3291</div>
                    <div className="text-xs text-black">
                      Dec 9, 2025 • 02:04 PM — Pickup: Farmgate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-emerald-400">
                    ৳ 340
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-green-600 text-xs">
                    Delivered
                  </span>
                </div>
              </summary>

              <div className="mt-3 border-t border-slate-700 pt-3 text-sm text-black hover:text-white grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="mt-1">Al Amin • 017xxxxxxxx</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Route</div>
                  <div className="mt-1">Farmgate → Bashundhara R/A</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Details</div>
                  <div className="mt-1">
                    Distance: 12km • Duration: 28m • Tip: ৳20
                  </div>
                </div>
              </div>

            
            </details>
            <details className="bg-base-300  shadow-xl p-4 rounded-2xl" open>
              <summary className="flex items-center  justify-between cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-bold text-gray-950">
                    #A1
                  </div>
                  <div>
                    <div className="font-semibold">Order #3291</div>
                    <div className="text-xs text-black">
                      Dec 9, 2025 • 02:04 PM — Pickup: Farmgate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-emerald-400">
                    ৳ 340
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-green-600 text-xs">
                    Delivered
                  </span>
                </div>
              </summary>

              <div className="mt-3 border-t border-slate-700 pt-3 text-sm text-black grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="mt-1">Al Amin • 017xxxxxxxx</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Route</div>
                  <div className="mt-1">Farmgate → Bashundhara R/A</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Details</div>
                  <div className="mt-1">
                    Distance: 12km • Duration: 28m • Tip: ৳20
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-3">
                <label className="px-3 py-2 rounded-lg border border-slate-700 cursor-pointer">
                  Receipt
                </label>
                <label className="px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold cursor-pointer">
                  Contact
                </label>
                <label className="px-3 py-2 rounded-lg bg-slate-700/40 cursor-pointer">
                  Report issue
                </label>
              </div>
            </details>
            <details className="bg-base-300  shadow-xl p-4 rounded-2xl" open>
              <summary className="flex items-center  justify-between cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-bold text-gray-950">
                    #A1
                  </div>
                  <div>
                    <div className="font-semibold">Order #3291</div>
                    <div className="text-xs text-black">
                      Dec 9, 2025 • 02:04 PM — Pickup: Farmgate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-emerald-400">
                    ৳ 340
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-green-600 text-xs">
                    Delivered
                  </span>
                </div>
              </summary>

              <div className="mt-3 border-t border-slate-700 pt-3 text-sm text-black grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-slate-400">Customer</div>
                  <div className="mt-1">Al Amin • 017xxxxxxxx</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Route</div>
                  <div className="mt-1">Farmgate → Bashundhara R/A</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Details</div>
                  <div className="mt-1">
                    Distance: 12km • Duration: 28m • Tip: ৳20
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-3">
                <label className="px-3 py-2 rounded-lg border border-slate-700 cursor-pointer">
                  Receipt
                </label>
                <label className="px-3 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold cursor-pointer">
                  Contact
                </label>
                <label className="px-3 py-2 rounded-lg bg-slate-700/40 cursor-pointer">
                  Report issue
                </label>
              </div>
            </details>

          

            {/* <!-- If list is long, user can save as HTML and scroll; optionally add a simple CSS-only pager here later --> */}

            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-lg border border-slate-700">
                  Prev
                </button>
                <button className="px-3 py-1 rounded-lg bg-slate-700/40">1</button>
                <button className="px-3 py-1 rounded-lg border border-slate-700">
                  Next
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DeliveryHistory;
