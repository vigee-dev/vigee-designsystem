"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { fr } from "date-fns/locale";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../ui/select";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { Label } from "../ui/label";
import { PiCalendarCheckDuoSolid } from "../../icons/PikaIcons";
var DatePickerRange = function (_a) {
    var className = _a.className, date = _a.date, setDate = _a.setDate, select = _a.select, label = _a.label, onChange = _a.onChange, disabledDays = _a.disabledDays;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var newDate;
    var handleSelectChange = function (value) {
        var lastYear = new Date().getFullYear() - 1;
        switch (value) {
            case "thisWeek":
                newDate = {
                    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
                    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
                };
                break;
            case "thisMonth":
                newDate = {
                    from: startOfMonth(new Date()),
                    to: endOfMonth(new Date()),
                };
                break;
            case "thisYear":
                newDate = { from: startOfYear(new Date()), to: endOfYear(new Date()) };
                break;
            case "lastYear":
                newDate = {
                    from: startOfYear(new Date(new Date().getFullYear() - 1, 0, 1)), // Début de l'année dernière
                    to: endOfYear(new Date(new Date().getFullYear() - 1, 11, 31)), // Fin de l'année dernière
                };
                break;
            case "allTime":
                newDate = {
                    from: undefined,
                    to: undefined,
                };
                break;
            default:
                return; // S'assurer que la fonction s'arrête si aucune correspondance n'est trouvée
        }
        setDate(newDate); // Met à jour l'état avec la nouvelle plage de dates
        if (onChange && newDate) {
            onChange(newDate); // Appelle onChange avec la nouvelle valeur directement
        }
        setIsOpen(false); // Ferme le Popover
    };
    return (_jsx("div", { className: cn("grid gap-2", className), children: _jsx(Popover, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs("div", { className: "flex flex-col gap-y-1 w-full", children: [label && _jsx(Label, { className: "font-bold text-primary", children: label }), _jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: "date", variant: "outline", className: cn("justify-start text-left font-normal w-full bg-input border-0", !date && "text-muted-foreground", className), children: [_jsx(PiCalendarCheckDuoSolid, { className: "mr-2 h-4 w-4 text-primary-light" }), (date === null || date === void 0 ? void 0 : date.from) ? (date.to ? (_jsxs(_Fragment, { children: [format(date.from, "dd LLL y", { locale: fr }), " -", " ", format(date.to, "dd LLL y", { locale: fr })] })) : (format(date.from, "LLL dd, y", { locale: fr }))) : (_jsx("span", { children: "Choisir une p\u00E9riode" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "end", children: _jsxs("div", { className: "flex flex-col p-2", children: [_jsx(PopoverClose, { children: select && (_jsxs(Select, { onValueChange: handleSelectChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choisir une p\u00E9riode" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsx(SelectItem, { value: "thisWeek", children: "Cette semaine" }), _jsx(SelectItem, { value: "thisMonth", children: "Ce mois-ci" }), _jsx(SelectItem, { value: "thisYear", children: "Cette ann\u00E9e" }), _jsx(SelectItem, { value: "lastYear", children: "L'année dernière" }), _jsx(SelectItem, { value: "allTime", children: "Depuis le d\u00E9but" })] })] })) }), _jsx(Calendar, { disabled: disabledDays, initialFocus: true, mode: "range", defaultMonth: date === null || date === void 0 ? void 0 : date.from, selected: date, onSelect: setDate, numberOfMonths: 2, locale: fr })] }) })] }) }) }));
};
export default DatePickerRange;
