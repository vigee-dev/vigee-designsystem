import React from "react";
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
declare const PieChart: ({ title, subtitle, data, container, colors }: Props) => React.JSX.Element;
export default PieChart;