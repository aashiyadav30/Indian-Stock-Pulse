"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StockChartProps {
  data: { time: string; price: number }[];
  isPositive: boolean;
}

const StockChart = ({ data, isPositive }: StockChartProps) => {
  const color = isPositive ? "hsl(160, 84%, 39%)" : "hsl(0, 72%, 51%)";

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={["dataMin - 5", "dataMax + 5"]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
            tickFormatter={(v) => `₹${v}`}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(220, 20%, 10%)",
              border: "1px solid hsl(220, 15%, 22%)",
              borderRadius: "8px",
              color: "hsl(210, 20%, 92%)",
              fontSize: "13px",
              fontFamily: "JetBrains Mono, monospace",
            }}
            formatter={(value: number) => [`₹${value.toFixed(2)}`, "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#chartGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
