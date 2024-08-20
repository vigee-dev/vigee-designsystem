"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}>
            <YAxis dataKey="browser" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label} />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">{footerText}</CardFooter>
    </Card>
  );
}
