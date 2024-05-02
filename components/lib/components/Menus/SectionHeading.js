"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../Buttons/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as HeroIcons from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
export default function SectionHeading(_a) {
    var title = _a.title, subtitle = _a.subtitle, buttonTitle = _a.buttonTitle, buttonLink = _a.buttonLink, nav = _a.nav, route = _a.route;
    var pathName = usePathname();
    var _b = useState(null), hoveredIndex = _b[0], setHoveredIndex = _b[1];
    return (_jsxs(_Fragment, { children: [title && _jsx("p", { className: "text-gray-700 text-3xl font-bold", children: title }), subtitle && (_jsx("p", { className: "text-gray-400 text-md font-medium", children: subtitle })), _jsxs("div", { className: "relative  mb-6 ", children: [_jsx("div", { className: "md:flex md:items-center md:justify-between", children: _jsx("div", { className: "mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0", children: buttonTitle && buttonLink && (_jsx(Link, { href: buttonLink ? buttonLink : "", children: _jsx(Button, { children: buttonTitle }) })) }) }), _jsxs("div", { className: "-ml-4 md:-ml-0 ", children: [_jsx("div", { className: "fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto  bg-white  shadow-xl z-40 border-t border-gray-200 pb-6 w-screen", children: _jsx("nav", { className: "flex flex-1 flex-col ", children: _jsx("ul", { role: "list", className: "flex flex-1 flex-col gap-y-7 ", children: _jsx("li", { children: _jsx("ul", { role: "list", className: " flex justify-center mx-auto  ", children: nav === null || nav === void 0 ? void 0 : nav.map(function (item) {
                                                    var includesSlug = pathName
                                                        .toLocaleLowerCase()
                                                        .match(item.slug ? item.slug : "//");
                                                    var IconComponent = HeroIcons[item.icon];
                                                    var IconFillComponent = HeroIconsSolid[item.icon];
                                                    return (_jsx("li", { children: item.href && (_jsxs(Link, { href: item.href, className: classNames(includesSlug
                                                                ? "font-bold text-primary"
                                                                : "text-gray-500 hover:text-secondary  font-bold ", "group grid  p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center "), children: [!includesSlug ? (_jsx(IconComponent, { className: classNames(includesSlug
                                                                        ? " text-primary   "
                                                                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] "), "aria-hidden": "true" })) : (_jsx(IconFillComponent, { className: classNames(includesSlug
                                                                        ? " text-primary   "
                                                                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] "), "aria-hidden": "true" })), item.name] })) }, item.name));
                                                }) }) }) }) }) }), _jsx("div", { className: "hidden md:block ", children: _jsx("nav", { className: "-mb-px flex space-x-4", children: nav === null || nav === void 0 ? void 0 : nav.map(function (tab, index) {
                                        var includesSlug = pathName
                                            .toLocaleLowerCase()
                                            .match(tab.slug ? tab.slug : "//");
                                        var IconComponent = HeroIcons[tab.icon];
                                        var IconFillComponent = HeroIconsSolid[tab.icon];
                                        return (_jsxs(Link, { onMouseEnter: function () { return setHoveredIndex(index); }, onMouseLeave: function () { return setHoveredIndex(null); }, href: "".concat(route, "/").concat(tab.slug), className: classNames(includesSlug
                                                ? "font-bold text-secondary"
                                                : "text-gray-500 hover:text-secondary  font-bold ", "group   p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center inline-flex gap-x-2 text-lg items-center"), children: [tab.icon && (includesSlug || hoveredIndex === index) ? (_jsx(IconFillComponent, { className: classNames(includesSlug
                                                        ? " text-secondary   "
                                                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-6 w-6 shrink-0 mx-auto justify-center    "), "aria-hidden": "true" })) : (tab.icon && (_jsx(IconComponent, { className: classNames(includesSlug
                                                        ? " text-secondary   "
                                                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-6 w-6 shrink-0 mx-auto justify-center   "), "aria-hidden": "true" }))), tab.color && (_jsx("svg", { className: "h-1.5 w-1.5 fill-".concat(tab.color), viewBox: "0 0 6 6", "aria-hidden": "true", children: _jsx("circle", { className: "animate-pulse", cx: 3, cy: 3, r: 3 }) })), tab.name.charAt(0).toUpperCase() + tab.name.slice(1)] }, tab.name));
                                    }) }) })] })] })] }));
}
