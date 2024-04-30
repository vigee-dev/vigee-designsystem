import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TypographyH1, TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";
export function PageHeader(_a) {
    var title = _a.title, children = _a.children, small = _a.small, icon = _a.icon, className = _a.className;
    return (_jsx("div", { className: cn("rounded-xl h-fit bg-white p-5  border items-center mb-4", className), children: _jsxs("div", { className: "flex flex-wrap justify-between  gap-x-4 w-full items-center ", children: [_jsxs("div", { className: "flex items-center gap-4 ", children: [icon, small ? (_jsx(TypographyH2, { className: "text-primary", children: title })) : (_jsx(TypographyH1, { className: "text-primary", children: title }))] }), _jsx("div", { className: "flex gap-x-4", children: children })] }) }));
}
