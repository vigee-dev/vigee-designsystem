var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
import { Slider as ShadSlider } from "../../components/ui/slider";
import { TypographyH2 } from "../Typography/Typography";
export function Slider(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsxs("div", { className: "flex flex-col  w-full", children: [_jsxs("div", { className: "flex justify-between  gap-x-2 ", children: [_jsx("p", { className: "text-gray-400 text-md", children: props.title }), _jsxs(TypographyH2, { className: "text-primary font-bold ", children: [props.value, "%"] })] }), _jsxs("div", { className: "flex gap-x-2 w-full", children: [_jsx("p", { className: "text-gray-400", children: props.min }), _jsx(ShadSlider, __assign({ defaultValue: props.defaultValue, max: props.max, step: props.step, className: cn("w-full text-gray-400 ", className) }, props)), _jsx("p", { className: "text-gray-400", children: props.max })] })] }));
}
