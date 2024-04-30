"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, LabelList, } from "recharts";
import { TypographyH3 } from "../Typography/Typography";
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
    return (_jsx("text", { x: x + width / 2, y: y - offset, fill: "#444", textAnchor: "middle", dominantBaseline: "central", fontSize: 10, children: formatValue(value, euro) }));
};
// Composant BarChart
export var BarChart = function (_a) {
    var data = _a.data, _b = _a.color, color = _b === void 0 ? "#000" : _b, title = _a.title, subtitle = _a.subtitle, container = _a.container, keys = _a.keys, _c = _a.euro, euro = _c === void 0 ? false : _c;
    return (_jsxs("div", { className: "".concat(container
            ? "bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
            : "", " items-center mb-2"), children: [_jsxs("div", { className: "flex flex-col pb-12", children: [_jsx(TypographyH3, { className: "font-bold text-primary", children: title }), _jsx("p", { className: "text-gray-500 text-sm", children: subtitle })] }), _jsx(ResponsiveContainer, { width: "100%", height: 350, children: _jsxs(RechartsBarChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }), _jsx(XAxis, { dataKey: "name", stroke: "#000", fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { stroke: "#000", fontSize: 12, tickLine: false, axisLine: false, tickFormatter: function (value) { return formatValue(value, euro); } }), keys &&
                            keys.map(function (key, index) { return (_jsx(Bar, { dataKey: key.dataKey, fill: key.color, radius: [4, 4, 0, 0], children: _jsx(LabelList, { dataKey: key.dataKey, content: function (props) {
                                        var _a, _b, _c, _d;
                                        return renderCustomizedLabel({
                                            x: (_a = Number(props.x)) !== null && _a !== void 0 ? _a : 0,
                                            y: (_b = Number(props.y)) !== null && _b !== void 0 ? _b : 0,
                                            width: (_c = Number(props.width)) !== null && _c !== void 0 ? _c : 0,
                                            value: (_d = Number(props.value)) !== null && _d !== void 0 ? _d : 0,
                                            euro: euro,
                                        });
                                    } }) }, index)); })] }) })] }));
};
