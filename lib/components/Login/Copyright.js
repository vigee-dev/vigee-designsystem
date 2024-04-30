import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
var Copyright = function (_a) {
    var _b = _a.clientName, clientName = _b === void 0 ? "Vigee" : _b;
    return (_jsx("div", { className: " bottom-1 justify-center mx-auto max-w-sm text-center mb-2", children: _jsxs("p", { className: "text-sm text-gray-500  md:block p-0 md:p-5 bottom-1 left-0 mt-4", children: ["Copyright \u00A9 ", new Date().getFullYear(), " ", "".concat(clientName, ". Tous droits r\u00E9serv\u00E9s. Developed by "), " ", _jsx(Link, { href: "https://www.vigee.fr", className: "text-black font-bold", children: "Vigee" })] }) }));
};
export default Copyright;
