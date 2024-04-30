import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../../lib/utils";
import Link from "next/link";
var ButtonAdd = function (_a) {
    var text = _a.text, icon = _a.icon, _b = _a.type, type = _b === void 0 ? "button" : _b, className = _a.className, onClick = _a.onClick, href = _a.href;
    return href ? (_jsx(Link, { href: href, children: _jsxs("button", { type: type, className: cn("flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer ", className), children: [icon, _jsx(TypographyH2, { className: "text-md", children: text })] }) })) : (_jsxs("button", { type: type, className: cn("flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer ", className), onClick: onClick, children: [icon, _jsx(TypographyH2, { className: "text-md", children: text })] }));
};
export default ButtonAdd;
