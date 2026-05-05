/**
 * @description Graphique en anneau (donut) Recharts pour visualiser la répartition proportionnelle de données catégorielles.
 * @useWhen afficher la distribution d'un ensemble de catégories (ex: répartition des types de contrats) → utiliser PieChart | intégrer un chart dans un dashboard avec titre/sous-titre → activer `container` | varier les couleurs par segment → passer `colors` ou `color` | ajuster l'angle de départ de l'anneau → utiliser `startAngle`.
 * @dontUseFor comparer des évolutions dans le temps → utiliser LineChart | afficher des valeurs absolues côte à côte → utiliser BarChart | représenter des tendances cumulées → utiliser AreaChart.
 * @example <PieChart title="Répartition des contrats" subtitle="Par type" data={[{ name: "CDI", value: 40 }, { name: "CDD", value: 20 }]} container />
 */
"use client";

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

const COLORS = ["#472549", "#774C60", "#B75D69", "#EACDC2", "#1A1423"];

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
  startAngle?: number;
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

const PieChart = ({
  title,
  subtitle,
  data,
  container,
  colors,
  color,
  startAngle = 360,
}: Props) => {
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
    const radius = innerRadius + (outerRadius - innerRadius) * 1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN) - 10;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data[index].name}
        (${data[index].value} - ${(percent * 100).toFixed(0)}%)`}
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
            cx="50%" // Centrer horizontalement
            cy="50%" // Centrer verticalement
            startAngle={startAngle}
            endAngle={0}
            innerRadius={50} // Définir le rayon intérieur pour le trou
            outerRadius={80} // Définir le rayon extérieur de l'anneau
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
            className="text-xs"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color}
                className={`opacity-${index % 2 === 0 ? 100 : 50}`}
              />
            ))}
          </Pie>
        </PieC>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
