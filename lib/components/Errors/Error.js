import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import error from "../../img/error/error.svg";
import Link from "next/link";
import { PiEnvelopeArrowRightDuoSolid } from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";
export function Error(_a) {
    var title = _a.title, subtitle = _a.subtitle, children = _a.children, supportEmail = _a.supportEmail, onClick = _a.onClick;
    return (_jsxs("div", { className: "flex flex-col items-center justify-center  w-full px-12 ", children: [error && (_jsx(Image, { width: 400, height: 400, className: "mx-auto w-44 h-auto", src: error, alt: "Erreur" })), _jsx("h1", { className: "text-xl text-primary font-bold text-center pt-6 font-display", children: title ? title : "Une erreur s'est produite." }), subtitle && _jsx("p", { className: "text-gray-400", children: subtitle }), supportEmail && (_jsx(Link, { className: "text-sm text-gray-500  items-center text-center font-display", href: supportEmail ? "mailto:".concat(supportEmail) : "/", children: _jsxs(Button, { variant: "outline", className: " flex gap-x-2", children: ["Contacter le support ", _jsx(PiEnvelopeArrowRightDuoSolid, {})] }) })), children, onClick && (_jsx(Button, { onClick: onClick, className: "py-2", children: "R\u00E9\u00E9ssayer" }))] }));
}
