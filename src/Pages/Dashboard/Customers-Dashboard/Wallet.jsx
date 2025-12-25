import React, { useContext } from "react";
import PreBackButton from "../../Components/PreBackButton";
import { useQuery } from "@tanstack/react-query";
import { AuthContextDashboard } from "../AuthClient/AuthContextDashboard";
import { riderWallet } from "../../../api/AllApi";
import { SaudiRiyal } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Wallet() {
  const { email } = useContext(AuthContextDashboard);
  const { data, isPending } = useQuery({
    queryKey: ["riderWallet"],
    queryFn: () => riderWallet(email),
    refetchInterval: 1000,
  });
  const week = data?.week?.filter(
    (weekData) => weekData.confirmorders.status === "delivered"
  );
  const day = data?.today?.filter((dayData) => dayData.confirmorders);
  const month = data?.month?.filter((monthData) => monthData.confirmorders);
  //  const orders_for_week = day.confirmorders.orders.filter(items => items.status === "delivered")
  //  const orders_for_month = month.confirmorders.filter(items => items.status === "delivered")
  //  console.log(week);

  const month_wallet = month?.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.confirmorders.totalAmount);
  }, 0);
  const day_wallet = day?.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.confirmorders.totalAmount);
  }, 0);
  const week_wallet = week?.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.confirmorders.totalAmount);
  }, 0);

  return (
    <div className="py-4 px-5">
        <Helmet>
              <title>Wallet</title>
            </Helmet>
      <PreBackButton title="Wallet" /> <hr className="h-1 bg-primary mb-4" />
      <main className="mx-auto max-w-5xl font-sans">
        <div className=" gap-6">
          {/* <!-- Main content (spans two columns on lg) --> */}
          <section className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-base-300 text-gray-950 rounded-2xl p-6 shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-black">Total balance</p>
                  <p className="text-3xl font-extrabold flex items-center">
                    <SaudiRiyal fontWeight={100}
                    
                    /> {month_wallet}
                  </p>

                  <p className="text-sm text-black mt-1 ">
                    Last 7 days:
                    {week_wallet === undefined ? 0 : week_wallet}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 ">
                <div className="bg-white shadow-xl cursor-pointer hover:bg-primary hover:text-white transition-all rounded-lg p-3 text-center">
                  <div className="text-xs text-black">Today</div>
                  <div className="text-lg font-bold mt-1 flex justify-center items-center">
                    <SaudiRiyal size={20} className="" />{" "}
                    {day_wallet === undefined ? 0 : day_wallet}
                  </div>
                </div>
                <div className="bg-white shadow-xl cursor-pointer hover:bg-primary hover:text-white transition-all rounded-lg p-3 text-center">
                  <div className="text-xs text-black">This week</div>
                  <div className="text-lg font-bold mt-1 flex justify-center items-center">
                   <SaudiRiyal size={20} className="" />{" "} {week_wallet === undefined ? 0 : week_wallet}
                  </div>
                </div>
                <div className="bg-white shadow-xl cursor-pointer hover:bg-primary hover:text-white transition-all rounded-lg p-3 text-center">
                  <div className="text-xs text-black">This month</div>
                  <div className="text-lg font-bold mt-1 flex justify-center items-center">
                    <SaudiRiyal size={20} className="" /> {month_wallet === undefined ? 0 : month_wallet}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Recent transactions</h3>

                <div className="mt-3 space-y-3">
                  <div className="flex cursor-pointer hover:text-white items-center justify-between bg-white hover:bg-primary   rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center font-bold text-slate-900">
                        A
                      </div>
                      <div>
                        <div className="font-semibold">Trip #3291</div>
                        <div className="text-xs text-slate-400">
                          Dec 9, 2025 • 02:04 PM
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-950 ">+৳ 340</div>
                  </div>

                  <div className="flex cursor-pointer hover:text-white items-center justify-between bg-white hover:bg-primary   rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-slate-700 flex items-center justify-center font-bold">
                        S
                      </div>
                      <div>
                        <div className="font-semibold">Fuel expense</div>
                        <div className="text-xs text-slate-400">
                          Dec 8, 2025 • 11:20 AM
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold tegraytext-gray-950 ">
                      -৳ 120
                    </div>
                  </div>

                  <div className="flex cursor-pointer hover:text-white items-center justify-between bg-white hover:bg-primary   rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-bold text-slate-900">
                        P
                      </div>
                      <div>
                        <div className="font-semibold">Payout</div>
                        <div className="text-xs text-slate-400">
                          Nov 28, 2025 • Payroll
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-950 ">+৳ 3,200</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
