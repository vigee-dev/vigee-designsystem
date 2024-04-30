import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import VigeeGrayLogo from "../../img/logos/VigeeGrayLogo.png";
import Image from "next/image";
export default function VariableLogo(_a) {
    var title = _a.title, big = _a.big;
    return (_jsxs("div", { className: "flex items-center gap-x-1", children: [_jsx(Image, { src: VigeeGrayLogo, alt: "Vigee", width: big ? 40 : 30, height: big ? 40 : 30, className: "md:flex mb-1" }), _jsx("p", { className: "font-display font-black text-black ".concat(big ? "text-4xl" : "text-2xl"), children: title })] }));
}
