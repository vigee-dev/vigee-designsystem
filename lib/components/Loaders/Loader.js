import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import VigeeLoaderTransparent from "../../img/logos/VigeeGrayLogo.png";
import Image from "next/image";
export var Loader = function (_a) {
    var text = _a.text, logo = _a.logo, borderColor = _a.borderColor;
    return (_jsxs("div", { className: "flex flex-col justify-center items-center gap-y-2 p-12", children: [_jsxs("div", { className: "relative flex items-center justify-center", children: [_jsx("div", { className: "absolute h-28 w-28 border-2 ".concat(borderColor ? borderColor : "border-gray-300", " rounded-full animate-spin border-t-transparent") }), _jsx(Image, { src: logo ? logo : VigeeLoaderTransparent, alt: "logo", width: 50, height: 40, className: "animate-pulse" })] }), _jsx("p", { className: "text-primary-foreground text-sm", children: text })] }));
};
