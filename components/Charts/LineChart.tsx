"use client";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

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
    // Arrondi au million le plus proche, avec un chiffre après la virgule
    formattedValue = `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    // Arrondi au millier le plus proche, avec un chiffre après la virgule
    formattedValue = `${(value / 1000).toFixed(1)}k`;
  } else {
    // Pour les valeurs inférieures à 1000, arrondi au nombre entier le plus proche
    formattedValue = Math.round(value).toString();
  }
  // Ajoute le symbole € si nécessaire
  return euro ? `${formattedValue}€` : formattedValue;
};

export const LineChart: React.FC<Props> = ({
  data,
  color,
  title,
  subtitle,
  container,
  euro = false,
  keys = [{ dataKey: "total", color: color }],
}) => {
  return (
    <div
      className={`${
        container
          ? "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          : ""
      } items-center mb-2 w-full`}
    >
      <div className="flex flex-col pb-12">
        <p className={`font-bold text-xl`} style={{ color: color }}>
          {title}
        </p>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          {keys.map((key, index) => (
            <defs key={index}>
              <linearGradient
                id={`colorUv${key.color}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={key.color} stopOpacity={0.1} />
                <stop offset="75%" stopColor={key.color} stopOpacity={0.03} />
              </linearGradient>
            </defs>
          ))}

          {keys.map((key, index) => (
            <Area
              key={index}
              dataKey={key.dataKey}
              type={"monotone"}
              stroke={key.color}
              fillOpacity={1}
              fill={`url(#colorUv${key.color})`}
            />
          ))}

          <XAxis
            dataKey={"name"}
            fontSize={10}
            tickLine={false}
            axisLine={false}
            interval={0}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => formatValue(value, euro)}
          />

          <Tooltip
            cursor={{ fill: "#000000", opacity: 0.05 }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                return (
                  <div className="rounded-lg bg-white p-2 shadow-md">
                    <p className="text-sm font-bold" style={{ color: color }}>
                      {payload[0].payload.name}
                    </p>

                    {payload.map((entry, index) => (
                      <p key={index} className="text-sm text-gray-500">{`${
                        entry.dataKey
                      }: ${formatValue(Number(entry.value), euro)}`}</p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />

          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#DDD" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
