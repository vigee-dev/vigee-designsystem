import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl, } from "../ui/form";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
import { Input } from "../ui/input";
import { PiCalendarFilledContrast, } from "../../icons/PikaIcons";
export default function DatePicker(_a) {
    var label = _a.label, form = _a.form, name = _a.name, className = _a.className, starting_date = _a.starting_date, disabled = _a.disabled, disabledKeys = _a.disabledKeys, returnString = _a.returnString, defaultValue = _a.defaultValue;
    var yearDefault = defaultValue
        ? moment(defaultValue).year().toString()
        : moment().year().toString();
    var dateDefault = defaultValue
        ? moment(defaultValue).toDate()
        : form && name
            ? form.getValues(name)
            : new Date();
    var inputDate = defaultValue
        ? moment(defaultValue).format("DD/MM/YYYY")
        : "";
    var _b = useState(yearDefault), selectedYear = _b[0], setSelectedYear = _b[1];
    var _c = useState(dateDefault), selectedDate = _c[0], setSelectedDate = _c[1];
    var _d = useState(inputDate), inputValue = _d[0], setInputValue = _d[1];
    var _e = useState(false), popoverOpen = _e[0], setPopoverOpen = _e[1];
    function convertDateToString(date) {
        if (typeof date === "string") {
            return moment(date).format("DD/MM/YYYY");
        }
        return date.toLocaleDateString();
    }
    var formatInputDate = function (value) {
        // Supprime tout caractère non numérique
        var numbers = value.replace(/\D/g, "");
        // Insère les '/' après le jour et le mois si la longueur de la chaîne le permet
        var formattedValue = numbers;
        if (numbers.length > 2) {
            formattedValue = numbers.substring(0, 2) + "/" + numbers.substring(2);
        }
        if (numbers.length > 4) {
            formattedValue =
                formattedValue.substring(0, 5) + "/" + formattedValue.substring(5);
        }
        // Limite la longueur de la chaîne à 10 caractères pour correspondre au format DD/MM/YYYY
        return formattedValue.substring(0, 10);
    };
    var handleInputChange = function (e) {
        var formattedInputValue = formatInputDate(e.target.value);
        setInputValue(formattedInputValue);
        // Tente de convertir la chaîne formatée en un objet Date, si valide
        var date = moment(formattedInputValue, "DD/MM/YYYY", true);
        if (date.isValid()) {
            setSelectedDate(date.toDate());
            return date.toDate();
        }
        else {
            setSelectedDate(null);
            return null;
        }
    };
    useEffect(function () {
        if (selectedDate) {
            setInputValue(moment(selectedDate).format("DD/MM/YYYY"));
        }
    }, [selectedDate]);
    return (_jsx(FormField, { control: form.control, name: name, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: "flex flex-col py-2", children: [_jsx(FormLabel, { className: "font-black text-primary", children: label }), _jsxs(Popover, { open: popoverOpen, onOpenChange: setPopoverOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(FormControl, { children: !disabledKeys ? (_jsx(Input, { value: field.value
                                            ? convertDateToString(field.value)
                                            : inputValue, onChange: function (e) {
                                            var date = handleInputChange(e);
                                            if (date) {
                                                field.onChange(returnString
                                                    ? moment(date).format("YYYY-MM-DD")
                                                    : date);
                                            }
                                            else {
                                                // Gérer le cas où la date n'est pas valide / ou réinitialiser le champ
                                                field.onChange(null);
                                            }
                                        }, placeholder: "Choisir une date", className: cn("pl-3 text-left font-display font-medium bg-input border-none", !field.value && "text-muted-foreground", className), type: "text", disabled: disabled })) : (_jsxs(Button, { disabled: disabled, variant: "outline", className: cn("pl-3 text-left font-display font-medium bg-input border-none", !field.value && "text-muted-foreground", className), children: [field.value ? (moment(field.value).format("DD/MM/YYYY")) : (_jsx("span", { children: "Choisir une date" })), _jsx(PiCalendarFilledContrast, { className: "ml-auto h-4 w-4 opacity-50" })] })) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: selectedDate !== null && selectedDate !== void 0 ? selectedDate : undefined, onSelect: function (date) {
                                        setSelectedDate(date !== null && date !== void 0 ? date : null);
                                        setPopoverOpen(false); // Ferme le Popover après la sélection d'une date
                                        field.onChange(returnString ? moment(date).format("YYYY-MM-DD") : date);
                                    }, disabled: function (date) {
                                        return starting_date ? date < starting_date : false;
                                    }, locale: fr, initialFocus: true, defaultMonth: selectedDate || new Date() }, selectedYear) })] }), _jsx(FormDescription, {}), _jsx(FormMessage, {})] }));
        } }));
}
