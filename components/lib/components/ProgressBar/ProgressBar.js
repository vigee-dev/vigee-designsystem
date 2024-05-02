"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Progress } from "../../components/ui/progress";
export function ProgressBar(_a) {
    var progress = _a.progress, text = _a.text;
    return (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Progress, { value: progress, className: "w-[60%] bg-gray-300" }), text && _jsx("p", { className: "mt-2 text-md text-gray-500", children: text })] }));
}
