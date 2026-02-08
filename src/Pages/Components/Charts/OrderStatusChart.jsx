import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyConfirmOrder } from "../../../api/AllApi";
import { useQuery } from "@tanstack/react-query";


const OrderStatusChart = ({ ordersData }) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
    
      const [year, setYear] = useState(currentYear);
      const [month, setMonth] = useState(currentMonth);
    
      const {data,isPending} = useQuery({
        queryKey:["getMonthlyConfirmOrder"],
        queryFn:()=> getMonthlyConfirmOrder(year,month),
        refetchInterval:10000
      })
      console.log(data)
    
      const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
 const februaryData = [
  { day: "1", delivered: 5, pending: 2, cancelled: 0, confirmed: 3 },
  { day: "2", delivered: 7, pending: 1, cancelled: 1, confirmed: 4 },
  { day: "3", delivered: 4, pending: 2, cancelled: 0, confirmed: 5 },
  { day: "4", delivered: 8, pending: 0, cancelled: 0, confirmed: 6 },
  { day: "5", delivered: 6, pending: 3, cancelled: 1, confirmed: 5 },
  // ... up to day 28/30/31
]

  return (
    <div className="bg-white p-4 rounded-lg  w-full h-96">
      <h2 className="text-lg font-semibold mb-4">Monthly Order Status</h2>
          <div className="flex gap-4">
      {/* Year Select */}
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Month Select */}
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
      >
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="day"  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="delivered" stackId="a" fill="#22c55e" />
          <Bar dataKey="pending" stackId="a" fill="#facc15" />
          <Bar dataKey="cancelled" stackId="a" fill="#ef4444" />
          <Bar dataKey="confirmed" stackId="a" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusChart;
