import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
export function TypographyH1(_a) {
    var children = _a.children, className = _a.className;
    return (_jsx("h1", { className: "flex items-center scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl my-1 ".concat(className), children: children }));
}
export function TypographyH2(_a) {
    var children = _a.children, className = _a.className;
    return (_jsx("h2", { className: cn("scroll-m-20  pb-2 text-xl  tracking-tight first:mt-0", className), children: children }));
}
export function TypographyH3(_a) {
    var children = _a.children, className = _a.className;
    return (_jsx("h3", { className: "scroll-m-20 text-lg  tracking-tight ".concat(className), children: children }));
}
export function TypographyH4(_a) {
    var children = _a.children, className = _a.className;
    return (_jsx("h4", { className: "scroll-m-20 text-md  tracking-tight ".concat(className), children: children }));
}
export function TypographyBlockquote(_a) {
    var children = _a.children;
    return (_jsx("blockquote", { className: "mt-6 border-l-2 pl-6 italic", children: children }));
}
