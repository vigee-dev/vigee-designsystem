import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
export var KPI = function (_a) {
    var stats = _a.stats;
    return (_jsx("div", { children: _jsx("dl", { className: "grid grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-xl shadow-sm md:grid-cols-3 md:divide-x md:divide-gray-100 md:divide-y-0  bg-white border border-gray-100", children: stats.map(function (item) { return (_jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("dt", { className: "text-base font-medium text-gray-400", children: item.name }), _jsxs("dd", { className: "mt-1 flex items-baseline justify-between md:block lg:flex", children: [_jsx("div", { className: "flex items-baseline text-xl font-black  ".concat((item === null || item === void 0 ? void 0 : item.color) ? "text-" + (item === null || item === void 0 ? void 0 : item.color) : "text-primary"), children: item.children }), _jsx("div", { className: classNames("inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs font-black md:mt-2 lg:mt-0"), children: item.stat })] })] }, item.name)); }) }) }));
};
