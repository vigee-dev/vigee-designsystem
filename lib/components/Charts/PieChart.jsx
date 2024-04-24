"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var recharts_1 = require("recharts");
var Typography_1 = require("../Typography/Typography");
var COLORS = ["#000", "#555555", "#000000", "#555555"];
var PieChart = function (_a) {
    var title = _a.title, subtitle = _a.subtitle, data = _a.data, container = _a.container, colors = _a.colors;
    var RADIAN = Math.PI / 180;
    var renderCustomizedLabel = function (_a) {
        var cx = _a.cx, cy = _a.cy, midAngle = _a.midAngle, innerRadius = _a.innerRadius, outerRadius = _a.outerRadius, percent = _a.percent, index = _a.index;
        var radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        var x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
        var y = cy + radius * Math.sin(-midAngle * RADIAN) - 40;
        return (<text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {"".concat(data[index].name, "\n        (").concat((percent * 100).toFixed(0), "%)")}
      </text>);
    };
    return (<div className={"".concat(container && "bg-white  rounded-xl border border-gray-100 shadow-sm", " items-center mb-2 ")}>
      <div className="flex flex-col md:pb-12 p-8">
        <Typography_1.TypographyH3 className="font-bold text-primary">{title}</Typography_1.TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      <recharts_1.ResponsiveContainer width="100%" height={350}>
        <recharts_1.PieChart width={800} height={600}>
          <recharts_1.Pie data={data} cx="50%" // Centrer horizontalement
     cy="50%" // Centrer verticalement
     startAngle={180} endAngle={0} innerRadius={70} outerRadius={100} labelLine={false} paddingAngle={5} label={renderCustomizedLabel} fill="#8884d8" dataKey="value" className="text-xs">
            {data.map(function (entry, index) { return (<recharts_1.Cell key={"cell-".concat(index)} fill={colors
                ? colors[index % colors.length]
                : COLORS[index % COLORS.length]}/>); })}
          </recharts_1.Pie>
        </recharts_1.PieChart>
      </recharts_1.ResponsiveContainer>
    </div>);
};
exports.default = PieChart;
