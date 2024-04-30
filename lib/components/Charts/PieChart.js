"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart as PieC, Pie, Cell, ResponsiveContainer, } from "recharts";
import { TypographyH3 } from "../Typography/Typography";
var COLORS = ["#000", "#555555", "#000000", "#555555"];
var PieChart = function (_a) {
    var title = _a.title, subtitle = _a.subtitle, data = _a.data, container = _a.container, colors = _a.colors;
    var RADIAN = Math.PI / 180;
    var renderCustomizedLabel = function (_a) {
        var cx = _a.cx, cy = _a.cy, midAngle = _a.midAngle, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, percent = _a.percent, index = _a.index;
        var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        var x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
        var y = cy + radius * Math.sin(-midAngle * RADIAN) - 40;
        return (_jsx("text", { x: x, y: y, fill: "black", textAnchor: x > cx ? "start" : "end", dominantBaseline: "central", children: "".concat(data[index].name, "\n        (").concat((percent * 100).toFixed(0), "%)") }));
    };
    return (_jsxs("div", { className: "".concat(container && "bg-white  rounded-xl border border-gray-100 shadow-sm", " items-center mb-2 "), children: [_jsxs("div", { className: "flex flex-col md:pb-12 p-8", children: [_jsx(TypographyH3, { className: "font-bold text-primary", children: title }), _jsx("p", { className: "text-gray-500 text-sm", children: subtitle })] }), _jsx(ResponsiveContainer, { width: "100%", height: 350, children: _jsx(PieC, { width: 800, height: 600, children: _jsx(Pie, { data: data, cx: "50%" // Centrer horizontalement
                        , cy: "50%" // Centrer verticalement
                        , startAngle: 180, endAngle: 0, innerRadius: 70, outerRadius: 100, labelLine: false, paddingAngle: 5, label: renderCustomizedLabel, fill: "#8884d8", dataKey: "value", className: "text-xs", children: data.map(function (entry, index) { return (_jsx(Cell, { fill: colors
                                ? colors[index % colors.length]
                                : COLORS[index % COLORS.length] }, "cell-".concat(index))); }) }) }) })] }));
};
export default PieChart;
