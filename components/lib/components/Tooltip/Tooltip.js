import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TooltipProvider, Tooltip as TootltipShad, TooltipTrigger, TooltipContent, } from "../ui/tooltip";
export function Tooltip(_a) {
    var message = _a.message, children = _a.children;
    return (_jsx("div", { className: "relative", children: _jsx(TooltipProvider, { children: _jsxs(TootltipShad, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { children: _jsx("p", { children: message }) })] }) }) }));
}
