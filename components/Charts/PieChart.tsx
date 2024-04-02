"use client";
import React from "react";
import {
  PieChart as PieC,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TypographyH3 } from "../Typography/Typography";

// Définition du type pour les éléments de données
interface DataItem {
  name: string;
  value: number;
}

const COLORS = ["#000", "#555555", "#000000", "#555555"];

interface Data {
  name: string;
  value: number;
}

interface Props {
  title?: string;
  subtitle?: string;
  data: Data[];
  color?: string;
  container?: boolean;
  colors?: string[];
}

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const PieChart = ({ title, subtitle, data, container, colors }: Props) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) - 40;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name}
        (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div
      className={`${
        container && "bg-white  rounded-xl border border-gray-100 shadow-sm"
      } items-center mb-2 `}
    >
      <div className="flex flex-col md:pb-12 p-8">
        <TypographyH3 className="font-bold text-primary">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieC width={800} height={600}>
          <Pie
            data={data}
            cx={270}
            cy={200}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            labelLine={false}
            paddingAngle={5}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            className="text-xs"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colors
                    ? colors[index % colors.length]
                    : COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>
        </PieC>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
