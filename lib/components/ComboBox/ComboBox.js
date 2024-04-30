"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "../../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
export function ComboBox(_a) {
    var _b;
    var items = _a.items, value = _a.value, onChange = _a.onChange, label = _a.label, _c = _a.placeholder, placeholder = _c === void 0 ? "Sélectionnez..." : _c, icon = _a.icon;
    var _d = useState(false), open = _d[0], setOpen = _d[1];
    var _e = useState(""), searchText = _e[0], setSearchText = _e[1];
    // Fonction de filtrage personnalisée
    var filterItems = function (value, search) {
        if (value === void 0) { value = ""; }
        if (search === void 0) { search = ""; }
        // Votre logique de filtrage ici, retournez 1 pour un match, 0 sinon.
        // Par exemple, filtrer sur le label des items
        if (value.toLowerCase().includes(search.toLowerCase()))
            return 1;
        return 0;
    };
    return (_jsx(Popover, { open: open, onOpenChange: setOpen, children: _jsxs("div", { className: "flex flex-col w-full", children: [_jsx(Label, { className: "font-bold text-primary-light", children: label }), _jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-full flex gap-x-2 bg-input border-0 justify-between", children: [_jsxs("div", { className: "flex gap-x-2 items-center text-gray-800", children: [icon && icon, value
                                        ? (_b = items.find(function (item) { return item.value === value; })) === null || _b === void 0 ? void 0 : _b.label
                                        : placeholder] }), _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { className: "w-full p-0", children: _jsxs(Command, { filter: filterItems, children: [_jsx(CommandInput, { placeholder: "Rechercher...", autoFocus: true }), _jsx(CommandEmpty, { children: "Aucun \u00E9l\u00E9ment trouv\u00E9." }), _jsx(CommandGroup, { className: "max-h-[200px]", children: _jsx(ScrollArea, { className: "h-[200px]", children: items.map(function (item) {
                                        return (_jsxs(CommandItem, { value: item.label, onSelect: function () {
                                                onChange(item.value === value ? undefined : item.value);
                                                setOpen(false);
                                            }, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0") }), item.label] }, item.value));
                                    }) }) })] }) })] }) }));
}
