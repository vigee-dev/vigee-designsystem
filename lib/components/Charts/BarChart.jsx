"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChart = void 0;
var react_1 = __importDefault(require("react"));
var recharts_1 = require("recharts");
var Typography_1 = require("../Typography/Typography");
// Fonction de formattage unifiée
var formatValue = function (value, euro) {
    var formattedValue = "";
    if (value >= 1000000) {
        // Pour les valeurs en millions, arrondi au million le plus proche sans décimales
        formattedValue = "".concat(Math.round(value / 1000000), "M");
    }
    else if (value >= 1000) {
        // Pour les valeurs en milliers, arrondi au millier le plus proche sans décimales
        formattedValue = "".concat(Math.round(value / 1000), "k");
    }
    else {
        // Pour les valeurs inférieures à 1000, arrondi au nombre entier le plus proche
        formattedValue = Math.round(value).toString();
    }
    return euro ? "".concat(formattedValue, "\u20AC") : formattedValue;
};
var renderCustomizedLabel = function (props) {
    var x = props.x, y = props.y, width = props.width, value = props.value, euro = props.euro;
    if (value === 0) {
        return null;
    }
    // Vérifiez si x, y, ou width ne sont pas définis, bien que cela ne devrait pas arriver dans la pratique avec Recharts
    if (x === undefined || y === undefined || width === undefined) {
        return null;
    }
    var offset = 5; // Décalage pour le positionnement du label
    return (<text x={x + width / 2} y={y - offset} fill="#444" textAnchor="middle" dominantBaseline="central" fontSize={10}>
      {formatValue(value, euro)}
    </text>);
};
// Composant BarChart
var BarChart = function (_a) {
    var data = _a.data, _b = _a.color, color = _b === void 0 ? "#000" : _b, title = _a.title, subtitle = _a.subtitle, container = _a.container, keys = _a.keys, _c = _a.euro, euro = _c === void 0 ? false : _c;
    return (<div className={"".concat(container
            ? "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
            : "", " items-center mb-2")}>
      <div className="flex flex-col pb-12">
        <Typography_1.TypographyH3 className="font-bold text-primary">{title}</Typography_1.TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <recharts_1.ResponsiveContainer width="100%" height={350}>
        <recharts_1.BarChart data={data}>
          <recharts_1.CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <recharts_1.XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={false}/>
          <recharts_1.YAxis stroke="#000" fontSize={12} tickLine={false} axisLine={false} tickFormatter={function (value) { return formatValue(value, euro); }}/>

          {keys &&
            keys.map(function (key, index) { return (<recharts_1.Bar key={index} dataKey={key.dataKey} fill={key.color} radius={[4, 4, 0, 0]}>
                <recharts_1.LabelList dataKey={key.dataKey} content={function (props) {
                    var _a, _b, _c, _d;
                    return renderCustomizedLabel({
                        x: (_a = Number(props.x)) !== null && _a !== void 0 ? _a : 0,
                        y: (_b = Number(props.y)) !== null && _b !== void 0 ? _b : 0,
                        width: (_c = Number(props.width)) !== null && _c !== void 0 ? _c : 0,
                        value: (_d = Number(props.value)) !== null && _d !== void 0 ? _d : 0,
                        euro: euro,
                    });
                }}/>
              </recharts_1.Bar>); })}
        </recharts_1.BarChart>
      </recharts_1.ResponsiveContainer>
    </div>);
};
exports.BarChart = BarChart;
