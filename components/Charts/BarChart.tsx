"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
  TextProps,
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
  euro?: boolean; // Prop pour activer le formatage en euro
}

// Fonction de formattage unifiée
const formatValue = (value: number, euro: boolean): string => {
  let formattedValue = "";

  if (value >= 1000000) {
    // Pour les valeurs en millions, arrondi au million le plus proche sans décimales
    formattedValue = `${Math.round(value / 1000000)}M`;
  } else if (value >= 1000) {
    // Pour les valeurs en milliers, arrondi au millier le plus proche sans décimales
    formattedValue = `${Math.round(value / 1000)}k`;
  } else {
    // Pour les valeurs inférieures à 1000, arrondi au nombre entier le plus proche
    formattedValue = Math.round(value).toString();
  }

  return euro ? `${formattedValue}€` : formattedValue;
};

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  value: number;
  euro: boolean;
}

const renderCustomizedLabel: React.FC<CustomLabelProps> = props => {
  const { x, y, width, value, euro } = props;

  if (value === 0) {
    return null;
  }

  // Vérifiez si x, y, ou width ne sont pas définis, bien que cela ne devrait pas arriver dans la pratique avec Recharts
  if (x === undefined || y === undefined || width === undefined) {
    return null;
  }

  const offset = 5; // Décalage pour le positionnement du label

  return (
    <text
      x={x + width / 2}
      y={y - offset}
      fill="#444"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
    >
      {formatValue(value, euro)}
    </text>
  );
};

// Composant BarChart
export const BarChart: React.FC<Props> = ({
  data,
  color = "#000",
  title,
  subtitle,
  container,
  keys,
  euro = false,
}) => {
  return (
    <div
      className={`${
        container
          ? "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          : ""
      } items-center mb-2`}
    >
      <div className="flex flex-col pb-12">
        <TypographyH3 className="font-bold text-primary">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <RechartsBarChart data={data}>
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
            tickFormatter={value => formatValue(value, euro)}
          />

          {keys &&
            keys.map((key, index) => (
              <Bar
                key={index}
                dataKey={key.dataKey}
                fill={key.color}
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey={key.dataKey}
                  content={props =>
                    renderCustomizedLabel({
                      x: Number(props.x) ?? 0,
                      y: Number(props.y) ?? 0,
                      width: Number(props.width) ?? 0,
                      value: Number(props.value) ?? 0,
                      euro,
                    })
                  }
                />
              </Bar>
            ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
