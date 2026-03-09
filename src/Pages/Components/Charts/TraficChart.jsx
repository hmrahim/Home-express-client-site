import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getVisitorByMonth } from "../../../api/AllApi";
import LoaderModal from "../Loader/LoaderModal";
const TraficChart = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

 

  const years = Array.from({ length: 16 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

 
const {data,isPending} = useQuery({
  queryKey:["getVisitorByMonth"],
  queryFn:()=> getVisitorByMonth(year,month),
  refetchInterval:10000
})


  return (
    <div className="w-full h-[350px] bg-white rounded-2xl p-4 ">
      
      
      <div>
         <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Daily Visitors
      </h2>
        {/* Filters */}
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
      </div>
     

      <ResponsiveContainer width="100%" height="100%" >
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient for premium look */}
          <defs>
            <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#visitorGradient)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TraficChart;
