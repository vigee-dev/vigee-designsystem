import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../Buttons/Button";
import { Container } from "../Container/Container";
import emptyMan from "../../img/empty/empty-man.svg";
export default function EmptyIllustration(_a) {
    var text = _a.text, subtitle = _a.subtitle, buttonLink = _a.buttonLink, buttonText = _a.buttonText, children = _a.children;
    return (_jsxs(Container, { className: "flex flex-col items-center justify-center  w-full px-12 p-8", children: [_jsx(Image, { width: 400, height: 400, className: "mx-auto w-64 h-auto", src: emptyMan, alt: "Empty list" }), _jsx("h1", { className: "text-xl text-gray-500 font-bold text-center pt-6 font-display", children: text }), _jsx("p", { className: "text-gray-400", children: subtitle }), buttonLink && (_jsx(Link, { className: "text-sm text-gray-500  items-center text-center font-display pt-2", href: "".concat(buttonLink), children: buttonText ? (_jsx(Button, { className: "flex gap-x-2", children: buttonText })) : (_jsx(Button, { icon: "add", big: true })) })), children] }));
}
