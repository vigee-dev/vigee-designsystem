"use client";

import {
  Bar,
  BarChart as BarChartRecharts,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface Data {
  name: string;
  total: number;
}

interface Props {
  data: Data[];
  color?: string;
}

export function BarChart({ data, color = "#000" }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChartRecharts data={data}>
        <XAxis
          dataKey="name"
          stroke="#000"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#000"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}€`}
        />
        <Bar dataKey="total" fill={color} radius={[4, 4, 0, 0]} />
      </BarChartRecharts>
    </ResponsiveContainer>
  );
}
