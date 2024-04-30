"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@react-hook/media-query";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "../ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
var DrawerContext = React.createContext(undefined);
export function useDrawerContext() {
    var context = React.useContext(DrawerContext);
    if (context === undefined) {
    }
    return context;
}
export function DrawerMobileWithoutContext(_a) {
    var children = _a.children, title = _a.title, description = _a.description, trigger = _a.trigger, icon = _a.icon, cancelButton = _a.cancelButton, _b = _a.size, size = _b === void 0 ? "sm" : _b;
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var contextValue = { open: open, setOpen: setOpen };
    var isDesktop = useMediaQuery("(min-width: 768px)");
    if (isDesktop) {
        return (_jsx(DrawerContext.Provider, { value: contextValue, children: _jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { onClick: function (e) { return e.stopPropagation(); }, asChild: true, children: trigger }), _jsxs(DialogContent, { onClick: function (e) { return e.stopPropagation(); }, className: "max-w-[425px]  ".concat(size === "sm"
                            ? "md:max-w-[425px]"
                            : size === "md"
                                ? "md:max-w-[650px]"
                                : "md:max-w-[1080px]", " "), children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "flex items-center gap-x-4 p-4 py-2", children: [icon, _jsxs("div", { className: "flex flex-col", children: [_jsx(DialogTitle, { className: "text-primary", children: title }), _jsx(DialogDescription, { children: description })] })] }) }), size !== "sm" ? (_jsx(ScrollArea, { className: "max-h-[80vh] pb-8 p-4", children: children })) : (_jsx("div", { className: "p-4", children: children }))] })] }) }));
    }
    return (_jsx(DrawerContext.Provider, { value: contextValue, children: _jsxs(Drawer, { open: open, onOpenChange: setOpen, children: [_jsx(DrawerTrigger, { onClick: function (e) { return e.stopPropagation(); }, asChild: true, children: trigger }), _jsx(DrawerContent, { onClick: function (e) { return e.stopPropagation(); }, children: _jsxs("div", { className: "text-[16px]", children: [_jsxs(ScrollArea, { className: "max-h-[80vh] pb-8", children: [_jsxs(DrawerHeader, { className: "text-left", children: [title && (_jsx(DrawerTitle, { className: "font-bold text-primary", children: title })), description && (_jsx(DrawerDescription, { children: description }))] }), _jsx("div", { className: "p-4", children: children })] }), cancelButton && (_jsx(DrawerFooter, { children: _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { type: "button", variant: "outline", children: "Annuler" }) }) }))] }) })] }) }));
}
