"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
function MobileMenu(_a) {
    var nav = _a.nav;
    var pathName = usePathname();
    var _b = useState(null), hoveredIndex = _b[0], setHoveredIndex = _b[1];
    return (_jsx("div", { className: "fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto  bg-white  shadow-xl z-40 border-t border-gray-200 pb-6 w-screen", children: _jsx("nav", { className: "flex flex-1 flex-col ", children: _jsx("ul", { role: "list", className: "flex flex-1 flex-col gap-y-7 ", children: _jsx("li", { children: _jsx("ul", { role: "list", className: " flex justify-center mx-auto  ", children: nav === null || nav === void 0 ? void 0 : nav.map(function (item) {
                            var includesSlug = pathName
                                .toLocaleLowerCase()
                                .match(item.slug ? item.slug : "//");
                            return (_jsx("li", { children: item.href && (_jsxs(Link, { href: item.href, className: classNames(includesSlug
                                        ? " text-primary"
                                        : "text-gray-500 hover:text-primary   ", "group grid  py-1 px-3 text-[11px]  hover: transform transition-all duration-100 ease-in-out text-center font-medium"), children: [!includesSlug ? (_jsxs("div", { className: classNames(includesSlug
                                                ? " text-primary   "
                                                : " hover:text-primary  transform transition-all duration-300 ease-in-out ", "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] "), "aria-hidden": "true", children: [" ", item.icon] })) : (_jsx("div", { className: classNames(includesSlug
                                                ? " text-primary   "
                                                : " hover:text-primary  transform transition-all duration-300 ease-in-out ", "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] "), "aria-hidden": "true", children: item.iconFill })), item.name] })) }, item.name));
                        }) }) }) }) }) }));
}
export default MobileMenu;
