var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Button } from "../../components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Input } from "../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
var PhoneInput = React.forwardRef(function (_a, ref) {
    var className = _a.className, onChange = _a.onChange, props = __rest(_a, ["className", "onChange"]);
    return (_jsx(RPNInput.default, __assign({ ref: ref, className: cn("flex", className), flagComponent: FlagComponent, countrySelectComponent: CountrySelect, inputComponent: InputComponent, 
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange: function (value) { return onChange === null || onChange === void 0 ? void 0 : onChange(value || ""); } }, props)));
});
PhoneInput.displayName = "PhoneInput";
var InputComponent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx(Input, __assign({ className: cn("rounded-s-none rounded-e-lg bg-input", className) }, props, { ref: ref })));
});
InputComponent.displayName = "InputComponent";
var CountrySelect = function (_a) {
    var disabled = _a.disabled, value = _a.value, onChange = _a.onChange, options = _a.options;
    var handleSelect = React.useCallback(function (country) {
        onChange(country);
    }, [onChange]);
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { type: "button", variant: "outline", className: cn("flex gap-1 rounded-e-none rounded-s-lg pr-1 pl-3"), disabled: disabled, children: [_jsx(FlagComponent, { country: value, countryName: value }), _jsx(ChevronsUpDown, { className: cn("h-4 w-4 opacity-50", disabled ? "hidden" : "opacity-100") })] }) }), _jsx(PopoverContent, { className: "p-0 w-[300px]", children: _jsx(Command, { children: _jsxs(CommandList, { children: [_jsx(CommandInput, { placeholder: "Chercher un pays..." }), _jsx(CommandEmpty, { children: "Pays non trouv\u00E9." }), _jsx(CommandGroup, { children: options
                                    .filter(function (x) { return x.value; })
                                    .map(function (option) { return (_jsxs(CommandItem, { className: "gap-2", onSelect: function () { return handleSelect(option.value); }, children: [_jsx(FlagComponent, { country: option.value, countryName: option.label }), _jsx("span", { className: "text-sm flex-1", children: option.label }), option.value && (_jsx("span", { className: "text-sm text-foreground/50", children: "+".concat(RPNInput.getCountryCallingCode(option.value)) })), _jsx(CheckIcon, { className: cn("ml-auto h-4 w-4", option.value === value ? "opacity-100" : "opacity-0") })] }, option.value)); }) })] }) }) })] }));
};
var FlagComponent = function (_a) {
    var country = _a.country, countryName = _a.countryName;
    var Flag = flags[country];
    return (_jsx("span", { className: "flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20", children: Flag && _jsx(Flag, { title: countryName }) }));
};
FlagComponent.displayName = "FlagComponent";
export { PhoneInput };
