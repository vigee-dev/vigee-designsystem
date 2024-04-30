"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Select as SelectShadCn, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
export function Select(_a) {
    var options = _a.options, _b = _a.placeholder, placeholder = _b === void 0 ? "Sélectionnez une valeur" : _b, onChange = _a.onChange, className = _a.className, disabled = _a.disabled, defaultValue = _a.defaultValue, label = _a.label;
    var _c = React.useState(defaultValue || undefined), selectedValue = _c[0], setSelectedValue = _c[1];
    var groupedOptions = options.reduce(function (acc, option) {
        var _a;
        var group = option.group || "Ungrouped"; // Default group name for ungrouped items
        if (!acc[group]) {
            acc[group] = [];
        }
        (_a = acc[group]) === null || _a === void 0 ? void 0 : _a.push(option);
        return acc;
    }, {});
    var handleValueChange = function (newValue) {
        if (newValue === String(selectedValue)) {
            setSelectedValue(undefined);
            onChange(undefined);
        }
        else {
            setSelectedValue(newValue);
            onChange(newValue);
        }
    };
    return (_jsxs(SelectShadCn, { onValueChange: handleValueChange, defaultValue: selectedValue, disabled: disabled, children: [label && _jsx(Label, { className: "font-black text-primary mt-2", children: label }), _jsx(SelectTrigger, { className: cn("w-[280px] font-medium bg-input", className), children: _jsx(SelectValue, { placeholder: placeholder }) }), _jsx(SelectContent, { className: cn("max-h-[200px] font-medium", className), children: Object.entries(groupedOptions).map(function (_a) {
                    var groupName = _a[0], groupOptions = _a[1];
                    return (_jsxs(SelectGroup, { children: [groupName !== "Ungrouped" && (_jsx(SelectLabel, { children: groupName })), groupOptions.map(function (option) { return (_jsx(SelectItem, { value: option.value, children: option.label }, option.value)); })] }, groupName));
                }) })] }));
}
