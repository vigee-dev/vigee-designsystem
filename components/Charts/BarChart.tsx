"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Tooltip,
} from "recharts";
import { TypographyH3 } from "../Typography/Typography";

interface Data {
  name: string;
  total?: number;
}

interface Key {
  dataKey: string;
  color: string;
  label?: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  data: Data[];
  color?: string;
  container?: boolean;
  keys?: Key[];
  euro?: boolean; // Prop pour activer le formatage en euro
  noY?: boolean;
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

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  value: number;
  euro: boolean;
  color: string;
}

const renderCustomizedLabel: React.FC<CustomLabelProps> = props => {
  const { x, y, width, value, euro } = props;

  if (value === 0) {
    return null;
  }

  if (x === undefined || y === undefined || width === undefined) {
    return null;
  }

  const offsetBelow = 10; // Décalage en dessous de la barre
  const offsetAbove = -5; // Décalage au-dessus de la barre
  const yOffset = value < 1 ? y + offsetBelow : y + offsetAbove; // Condition pour ajuster la position

  return (
    <text
      x={x + width / 2} // Centrer horizontalement
      y={yOffset} // Position verticale ajustée selon la condition
      fill={props.color} // Couleur différente selon la position du label
      textAnchor="middle" // Centrer horizontalement le texte
      dominantBaseline="central" // Centrer verticalement le texte
      fontSize={9}
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
  noY = false,
}) => {
  const maxValue = Math.max(...data.map(item => item.total ?? 0));

  return (
    <div
      className={`${
        container
          ? "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          : ""
      } items-center mb-2 `}
    >
      <div className="flex flex-col pb-12">
        <TypographyH3 className="font-bold text-primary">{title}</TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          {!noY && (
            <YAxis
              stroke="#000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={value => formatValue(value, euro)}
            />
          )}

          <Tooltip
            cursor={{ fill: "#000000", opacity: 0.05 }}
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                return (
                  <div className="rounded-lg bg-white p-2 shadow-md">
                    <p className="text-sm font-bold text-primary">
                      {payload[0].payload.name}
                    </p>

                    {payload.map((entry, index) => {
                      const key = keys?.find(k => k.dataKey === entry.dataKey);
                      const displayName = key?.label || entry.dataKey;
                      return (
                        <p key={index} className="text-sm text-gray-500">{`${
                          displayName
                        }: ${formatValue(Number(entry.value), euro)}`}</p>
                      );
                    })}
                  </div>
                );
              }
              return null;
            }}
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
                  // @ts-ignore à vérifier
                  content={props =>
                    renderCustomizedLabel({
                      color: key.color,
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
