import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../Buttons/Button";
import { SheetTrigger, SheetTitle, SheetDescription, SheetHeader, SheetContent, Sheet, } from "../ui/sheet";
export default function SheetTriggered(_a) {
    var triggerText = _a.triggerText, title = _a.title, description = _a.description, children = _a.children, icon = _a.icon;
    return (_jsx("div", { className: "fixed bottom-4 right-4", children: _jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { className: "rounded-full", iconComponent: icon, children: triggerText }) }), _jsxs(SheetContent, { side: "right", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: title }), _jsx(SheetDescription, { children: description })] }), _jsx("div", { className: "grid gap-4 py-4", children: children })] })] }) }));
}
