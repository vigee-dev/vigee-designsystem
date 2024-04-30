import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
export function Container(_a) {
    var children = _a.children, className = _a.className;
    return (_jsx("div", { className: cn("bg-white flex flex-col border rounded-xl  justify-center  my-4 w-full", className), children: children }));
}
