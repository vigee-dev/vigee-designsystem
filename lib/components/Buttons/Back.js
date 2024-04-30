import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
var Back = function (_a) {
    var href = _a.href, where = _a.where, onClick = _a.onClick;
    return (_jsx("div", { className: "flex flex-grid text-gray-400 ", children: href ? (_jsxs(Link, { href: href, className: "flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold", children: [_jsx(ArrowLeftIcon, { width: 15 }), _jsxs("p", { className: "mx-1 text-sm ", children: [" ", where] })] })) : (_jsxs(Button, { variant: "ghost", onClick: onClick, className: "flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold border-0", children: [_jsx(ArrowLeftIcon, { width: 15 }), _jsxs("p", { className: "mx-1 text-sm ", children: [" ", where] })] })) }));
};
export default Back;
