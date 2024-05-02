import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
export default function DatePicker(_a) {
    var label = _a.label, form = _a.form, name = _a.name, className = _a.className, starting_date = _a.starting_date, disabled = _a.disabled;
    return (_jsx(FormField, { control: form.control, name: name, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: "flex flex-col py-2", children: [_jsx(FormLabel, { className: "font-black text-primary", children: label }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(FormControl, { children: _jsxs(Button, { disabled: disabled, variant: "outline", className: cn("pl-3 text-left font-display font-medium bg-input border-none  ".concat(className), !field.value && "text-muted-foreground"), children: [field.value ? (moment(field.value).format("DD/MM/YYYY")) : (_jsx("span", { children: "Choisir une date" })), _jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: function (date) {
                                        var formatted_date = moment(date).format("YYYY-MM-DD");
                                        field.onChange(formatted_date);
                                    }, disabled: function (date) {
                                        if (starting_date) {
                                            return date < starting_date;
                                        }
                                        return false;
                                    }, locale: fr, initialFocus: true }) })] }), _jsx(FormDescription, {}), _jsx(FormMessage, {})] }));
        } }));
}
