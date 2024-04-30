import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Collapsible as CollapsibleWrapper, CollapsibleContent, CollapsibleTrigger, } from "../../components/ui/collapsible";
import { useState } from "react";
var Collapsible = function (_a) {
    var trigger = _a.trigger, children = _a.children, className = _a.className, _b = _a.defaultOpen, defaultOpen = _b === void 0 ? false : _b;
    var _c = useState(defaultOpen), isOpen = _c[0], setIsOpen = _c[1];
    return (_jsxs(CollapsibleWrapper, { open: isOpen, onOpenChange: setIsOpen, className: className, children: [_jsx(CollapsibleTrigger, { asChild: true, children: _jsx("div", { children: trigger }) }), _jsx(CollapsibleContent, { className: "space-y-2", children: children })] }));
};
export default Collapsible;
