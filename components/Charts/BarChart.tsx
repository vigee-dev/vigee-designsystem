"use client";

import {
  Bar,
  BarChart as BarChartRecharts,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { TypographyH3 } from "../Typography/Typography";

interface Data {
  name: string;
  total: number;
}

interface Key {
  dataKey: string;
  color: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  data: Data[];
  color?: string;
  container?: boolean;
  keys: Key[];
}

export function BarChart({
  data,
  color = "#000",
  title,
  subtitle,
  container,
  keys,
}: Props) {
  return (
    <div
      className={`${
        container && "bg-white p-8 rounded-md border border-gray-100 shadow-sm"
      } items-center mb-2 `}
    >
      <div className="flex flex-col pb-12">
        <TypographyH3 className="font-bold">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

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

          {keys ? (
            keys.map((key, index) => (
              <Bar
                key={index}
                dataKey={key.dataKey}
                fill={key.color}
                radius={[4, 4, 0, 0]}
              />
            ))
          ) : (
            <Bar dataKey="total" fill={color} radius={[4, 4, 0, 0]} />
          )}
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
}
