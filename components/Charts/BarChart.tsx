"use client";
import {
  Bar,
  BarChart as BarChartRecharts,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { TypographyH3 } from "../Typography/Typography";

interface Data {
  name: string;
  total?: number;
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
  keys?: Key[];
  referenceLines?: { value: number; label: string; stroke: string }[]; // Ajout d'une prop pour les lignes de référence
}

export function BarChart({
  data,
  color = "#000",
  title,
  subtitle,
  container,
  keys,
  referenceLines, // Intégrer les lignes de référence comme une prop
}: Props) {
  return (
    <div
      className={`${
        container && "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
      } items-center mb-2 `}
    >
      <div className="flex flex-col pb-12">
        <TypographyH3 className="font-bold">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChartRecharts data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
            tickFormatter={value => `${value}€`}
          />

          {keys &&
            keys.map((key, index) => (
              <Bar
                key={index}
                dataKey={key.dataKey}
                fill={key.color}
                radius={[4, 4, 0, 0]}
              />
            ))}

          {referenceLines &&
            referenceLines.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line.value}
                label={line.label}
                stroke={line.stroke}
                strokeDasharray="3 3"
              />
            ))}
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
}
