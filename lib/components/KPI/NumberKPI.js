import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { cn, currency } from "../../lib/utils";
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
var NumberKPI = function (_a) {
    var stats = _a.stats, _b = _a.columns, columns = _b === void 0 ? 3 : _b;
    var variation = function (previousStat, stat) {
        var diff = stat - previousStat;
        var percent = (diff / previousStat) * 100;
        return percent.toFixed(0);
    };
    return (_jsx("div", { className: "my-2", children: _jsx("dl", { className: "grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-xl shadow-sm md:grid-cols-".concat(columns, " md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100"), children: stats.map(function (item) { return (_jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("dt", { className: "text-base font-medium text-gray-400", children: item.name }), _jsxs("dd", { className: "mt-1 flex items-baseline justify-between md:block lg:flex", children: [_jsx("div", { className: cn("flex items-baseline text-xl font-black text-primary", item.color), children: currency(item.stat).toRoundedEuro() }), (item === null || item === void 0 ? void 0 : item.previousStat) && (_jsxs("div", { className: classNames((item === null || item === void 0 ? void 0 : item.previousStat) < item.stat
                                    ? " ".concat(!item.upNegative
                                        ? "text-green-600 bg-green-100"
                                        : "text-red-800 bg-red-100")
                                    : " ".concat(!item.upNegative
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-800"), "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"), children: [item.previousStat < item.stat ? (_jsx(ArrowUpIcon, { className: "-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ".concat(!item.upNegative ? "text-green-600" : "text-red-800"), "aria-hidden": "true" })) : (_jsx(ArrowDownIcon, { className: "-ml-1 mr-0.5 h-4 w-4 flex-shrink-0 self-center ".concat(!item.upNegative ? "text-red-600" : "text-green-800"), "aria-hidden": "true" })), _jsxs("span", { className: "sr-only", children: [item.previousStat < item.stat ? "Increased" : "Decreased", " ", "by", " "] }), item.previousStat && variation(item.previousStat, item.stat), " ", "%"] }))] })] }, item.name)); }) }) }));
};
export default NumberKPI;
