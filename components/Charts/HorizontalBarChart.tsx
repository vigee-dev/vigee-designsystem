"use client";

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from "recharts"; // Ajoutez LabelList ici

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart";

interface ChartDataItem {
  label: string;
  value: number;
  color: string;
}

interface ComponentProps {
  data: ChartDataItem[];
  title: string;
  description: string;
  footerText: string;
  euro?: boolean;
}

export function HorizontalBarChart({ data, title, description, footerText }: ComponentProps) {
  const chartConfig = data.reduce((config, item) => {
    config[item.label] = {
      label: item.label,
      color: item.color,
    };
    return config;
  }, {} as ChartConfig);

  chartConfig.value = {
    label: "Valeur",
  };

  // Calculer le pourcentage pour chaque barre
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / totalValue) * 100).toFixed(0) + "%",
  }));

  // Trier les données par valeur décroissante
  const sortedData = dataWithPercentage.sort((a, b) => b.value - a.value);

  return (
    <Card className="border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sortedData}
            layout="vertical"
            margin={{
              left: 40, // Ajoutez plus de marge à gauche
            }}>
            <YAxis dataKey="label" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value} />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="value" layout="vertical" radius={5}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} /> // Utilisez la couleur ici
              ))}
              <LabelList dataKey="percentage" position="right" className="text-primary" /> // Affichez le pourcentage en bout de ligne
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">{footerText}</CardFooter>
    </Card>
  );
}
