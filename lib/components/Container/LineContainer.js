import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { TypographyH4 } from "../Typography/Typography";
import { PiChevronBigRightStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";
var Content = function (_a) {
    var title = _a.title, icon = _a.icon, children = _a.children, className = _a.className;
    return (_jsx("div", { className: cn("rounded-xl h-fit p-5 my-4 items-center border border-slate-200 hover:bg-slate-50 transition-ease-in-out duration-100 hover:cursor-pointer bg-white ", className), children: _jsxs("div", { className: "flex flex-wrap justify-between gap-x-4 w-full items-center", children: [_jsxs("div", { className: "flex gap-x-4", children: [icon && _jsx("div", { className: "icon-container text-gray-400", children: icon }), _jsx(TypographyH4, { children: title })] }), _jsx("div", { className: "flex gap-x-4", children: _jsx("div", { className: "rounded-md p-1 ", children: children ? (children) : (_jsx(PiChevronBigRightStroke, { className: "text-gray-400 hover:text-primary transform ease-in-out duration-300" })) }) })] }) }));
};
export function LineContainer(_a) {
    var title = _a.title, children = _a.children, background = _a.background, icon = _a.icon, href = _a.href, onClick = _a.onClick, className = _a.className;
    // Si href est présent, utilisez Link pour la navigation
    if (href) {
        return (_jsx(Link, { href: href, passHref: true, children: _jsx(Content, { title: title, icon: icon, background: background, className: className }) }));
    }
    // Sinon, appliquez l'événement onClick directement
    return (_jsx("div", { onClick: onClick, children: _jsx(Content, { title: title, icon: icon, background: background, children: children }) }));
}
