"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Button } from "../../components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger, } from "../../components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { Label } from "../ui/label";
export function ComboBoxResponsive(_a) {
    var label = _a.label, items = _a.items, text = _a.text, selectedStatus = _a.selectedStatus, setSelectedStatus = _a.setSelectedStatus;
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden md:block", children: _jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(Label, { className: "font-bold text-primary", children: label }), _jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-[150px] justify-start", children: selectedStatus ? _jsx(_Fragment, { children: selectedStatus.label }) : _jsx(_Fragment, { children: text }) }) }), _jsx(PopoverContent, { className: "w-[200px] p-0", align: "start", children: _jsx(StatusList, { statuses: items, setOpen: setOpen, setSelectedStatus: setSelectedStatus }) })] }) }), _jsx("div", { className: "md:hidden", children: _jsxs(Drawer, { open: open, onOpenChange: setOpen, children: [_jsx(Label, { className: "font-bold text-primary", children: label }), _jsx(DrawerTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", className: "w-[150px] justify-start", children: selectedStatus ? _jsx(_Fragment, { children: selectedStatus.label }) : _jsx(_Fragment, { children: text }) }) }), _jsx(DrawerContent, { children: _jsx("div", { className: "mt-4 border-t", children: _jsx(StatusList, { statuses: items, setOpen: setOpen, setSelectedStatus: setSelectedStatus }) }) })] }) })] }));
}
function StatusList(_a) {
    var statuses = _a.statuses, setOpen = _a.setOpen, setSelectedStatus = _a.setSelectedStatus;
    return (_jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Rechercher..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "Aucun r\u00E9sultat." }), _jsx(CommandGroup, { children: statuses.map(function (status) { return (_jsx(CommandItem, { value: status.value, onSelect: function (value) {
                                setSelectedStatus(statuses.find(function (priority) { return priority.value === value; }) || null);
                                setOpen(false);
                            }, children: status.label }, status.value)); }) })] })] }));
}
