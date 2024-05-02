"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import VariableLogo from "../Logos/VariableLogo";
import { Badge } from "../ui/badge";
import { Select } from "../Select/Select";
import { cn } from "../lib/utils";
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
var Sidebar = function (_a) {
    var _b, _c;
    var navigation = _a.navigation, children = _a.children, noLogo = _a.noLogo, _d = _a.text, text = _d === void 0 ? "black" : _d, logo = _a.logo, _e = _a.menu, menu = _e === void 0 ? false : _e, logoSmall = _a.logoSmall, title = _a.title, width = _a.width, height = _a.height, withSelect = _a.withSelect, selectOptions = _a.selectOptions, onChangeSelect = _a.onChangeSelect, classNameSelect = _a.classNameSelect, selectPlaceHolder = _a.selectPlaceHolder, defaultValueSelect = _a.defaultValueSelect, className = _a.className;
    var _f = useState(true), sidebarOpen = _f[0], setSidebarOpen = _f[1];
    var _g = useState(false), hoverMenu = _g[0], setHoverMenu = _g[1];
    var router = usePathname();
    var _h = useState(null), hoveredIndex = _h[0], setHoveredIndex = _h[1];
    var options = [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
    ];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden md:flex fixed inset-y-0 lg:flex ".concat(sidebarOpen ? "w-56 " : "w-16  ", " flex-col h-screen transition-all ease-in-out duration-300"), onMouseEnter: function () { return setHoverMenu(true); }, onMouseLeave: function () { return setHoverMenu(false); }, children: _jsxs("div", { className: cn("".concat("flex px-3", " grow flex-col gap-y-5 overflow-y-auto  shadow-md transform transition-all duration-300 ease-in-out bg-white"), className), children: [_jsx("div", { className: "flex h-16 shrink-0 items-center justify-between pt-4 w-full ", children: _jsxs("div", { className: "justify-between mx-auto flex w-full px-1", children: [_jsx(Link, { href: "/", children: sidebarOpen && !noLogo ? (logo ? (_jsx(Image, { src: logo, alt: "Vigee", width: width ? width : 100, height: height ? height : 60 })) : (_jsx(VariableLogo, { title: "Vigee" }))) : !hoverMenu && !noLogo ? (logoSmall && (_jsx(Image, { src: logoSmall, alt: "Vigee", width: 30, height: 30 }))) : (title &&
                                            sidebarOpen && (_jsx("p", { className: "text-primary text-xl font-bold", children: title }))) }), hoverMenu && !sidebarOpen && (_jsx(ChevronRightIcon, { onClick: function () { return setSidebarOpen(true); }, className: "w-12 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1" })), hoverMenu && sidebarOpen && (_jsx("div", { className: "flex shrink-0 items-center justify-left  cursor-pointer text-gray-400 hover:text-gray-800 pt-1 transform transition-all duration-300 ease-in-out", children: _jsx(ChevronLeftIcon, { onClick: function () { return setSidebarOpen(false); }, className: "text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1" }) }))] }) }), _jsx("nav", { className: "flex flex-1 flex-col  ", children: _jsx("ul", { role: "list", className: "flex flex-1 flex-col gap-y-7", children: _jsxs("li", { children: [withSelect &&
                                            selectOptions &&
                                            onChangeSelect &&
                                            selectOptions.length > 0 &&
                                            sidebarOpen && (_jsx("div", { className: "flex w-full py-2 ", children: _jsx(Select, { options: selectOptions, onChange: function (e) {
                                                    if (e === undefined)
                                                        return;
                                                    onChangeSelect(e);
                                                }, placeholder: selectPlaceHolder, className: classNameSelect, defaultValue: (_c = defaultValueSelect !== null && defaultValueSelect !== void 0 ? defaultValueSelect : (_b = selectOptions[0]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : "" }) })), _jsx("ul", { role: "list", className: "-mx-2 space-y-0 items-center", children: navigation.map(function (item, index) {
                                                // Fonction pour déterminer la classe de base
                                                var baseClass = item.highlight
                                                    ? "group flex gap-x-2 rounded-md p-[3px] text-primary  leading-6 transform transition-all bg-white border border-gray-200  duration-100 ease-in-out items-center mx-1 my-1  shadow-sm hover:scale-105 ".concat("text-md", " ")
                                                    : "group flex gap-x-2 rounded-md p-[3px] leading-6 transform transition-all duration-100 ease-in-out items-center mx-1 my-1  ".concat("text-md");
                                                // Fonction pour déterminer la classe de texte et de fond
                                                var textAndBgClass = router.includes(item.slug)
                                                    ? "text-md  p-2  ".concat(text === "white"
                                                        ? "text-gray-100 text-white bg-white/10"
                                                        : "text-gray-600 text-primary bg-black/5")
                                                    : "p-2 ".concat(text === "white"
                                                        ? "text-gray-100 hover:text-white hover:bg-white/10"
                                                        : "text-gray-600 hover:text-primary hover:bg-black/5");
                                                return (_jsx("div", { onMouseEnter: function () { return setHoveredIndex(index); }, onMouseLeave: function () { return setHoveredIndex(null); }, children: _jsx("li", { children: _jsx(Link, { prefetch: true, href: item.href, className: "".concat(baseClass, " ").concat(textAndBgClass), children: _jsxs("div", { className: "flex justify-between w-full pr-2", children: [_jsxs("div", { className: "flex items-center gap-x-2", children: [router.includes(item.slug) ||
                                                                                hoveredIndex === index ||
                                                                                item.highlight ? (_jsx("div", { className: classNames("".concat(text === "white"
                                                                                    ? "text-secondary group-hover:text-secondary"
                                                                                    : "text-primary group-hover:text-primary", "   group-hover:scale-105  transform transition-all duration-300 ease-in-out "), "h-".concat("8", " w-").concat("8", " shrink-0  my-auto ml-1 rounded-full p-[4px]")), "aria-hidden": "true", children: item.iconFill ? item.iconFill : item.icon })) : (_jsx("div", { className: classNames("".concat(text === "white"
                                                                                    ? "text-gray-500 group-hover:text-gray-500"
                                                                                    : "text-gray-600 group-hover:text-gray-600", " group-hover:scale-105  transform transition-all duration-300 ease-in-out "), "h-".concat("8", " w-").concat("8", " shrink-0  my-auto ml-1  p-[5px] ")), "aria-hidden": "true", children: item.icon })), sidebarOpen && item.name] }), (item === null || item === void 0 ? void 0 : item.notifications) && (_jsx("div", { className: "flex items-center", children: _jsx(Badge, { className: "bg-red-400 text-white opacity-90 p-1 w-[20px] h-[20px] items-center flex justify-center hover:text-white", children: item === null || item === void 0 ? void 0 : item.notifications }) }))] }) }) }, item.name) }, index));
                                            }) })] }) }) })] }) }), _jsx("main", { className: "".concat(sidebarOpen ? "lg:pl-56" : "lg:pl-16", " pt-2 md:py-2 bg-gray-50  h-full min-h-screen "), children: _jsxs("div", { className: " md:py-6 pb-24 ", children: [!sidebarOpen && (_jsx("div", { className: "flex shrink-0 items-center justify-start md:justify-start ", onClick: function () { return setSidebarOpen(true); }, children: menu && (_jsx("p", { className: " mb-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 font-bold p-2 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer ", children: "Menu" })) })), children] }) })] }));
};
export default Sidebar;
