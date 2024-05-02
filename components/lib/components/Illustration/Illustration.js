import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
export default function Illustration(_a) {
    var title = _a.title, title2 = _a.title2, subtitle = _a.subtitle, img = _a.img, children = _a.children, _b = _a.width, width = _b === void 0 ? 500 : _b, _c = _a.height, height = _c === void 0 ? 500 : _c;
    return (_jsxs("div", { className: "flex flex-col items-center justify-center bg-primary h-screen w-full px-12 ", children: [img && (_jsx(Image, { width: width, height: height, className: "mx-auto", src: img, alt: "LoginForm image" })), _jsxs("h1", { className: "text-5xl text-gray-300 font-black text-center pt-6 font-display", children: [title, " ", _jsx("span", { className: "text-white", children: title2 })] }), subtitle && (_jsxs("p", { className: "text-xl text-slate-500   text-center font-display", children: [" ", subtitle, " "] })), children] }));
}
