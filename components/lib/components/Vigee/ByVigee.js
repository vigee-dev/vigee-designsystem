import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import Image from "next/image";
import vigee from "../../img/logos/vigee.png";
var ByVigee = function (_a) {
    var dark = _a.dark;
    return dark ? (_jsx("span", { className: "text-slate-400 flex pt-8", children: _jsxs(Link, { href: "https://www.vigee.fr", target: "_blank", className: "text-slate-400 flex", children: ["Developed by", " ", _jsx(Image, { src: vigee, width: 70, height: 20, alt: "Vigee", className: "pt-1 ml-2 " })] }) })) : (_jsx("span", { className: "text-primary flex", children: _jsxs(Link, { href: "https://www.vigee.fr", target: "_blank", className: "text-primary flex", children: ["Developed by", " ", _jsx(Image, { src: vigee, width: 70, height: 20, alt: "Vigee", className: "pt-1 ml-2 " })] }) }));
};
export default ByVigee;
