"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQueryState } from "nuqs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { cn } from "../../lib/utils";
export var UrlFilter = function (_a) {
    var name = _a.name, options = _a.options, placeholder = _a.placeholder, _b = _a.type, type = _b === void 0 ? "string" : _b, defaultValue = _a.defaultValue, className = _a.className;
    var _c = useQueryState(name, {
        defaultValue: defaultValue || "",
        clearOnDefault: true,
        shallow: false,
    }), filter = _c[0], setFilter = _c[1];
    var handleValueChange = function (newValue) {
        if (newValue == filter) {
            setFilter("");
            return;
        }
        setFilter(newValue);
    };
    return (_jsxs(Select, { onValueChange: handleValueChange, defaultValue: filter, children: [_jsx(SelectTrigger, { className: cn("w-fit", className), children: _jsx(SelectValue, { placeholder: placeholder }) }), _jsx(SelectContent, { className: "w-full md:w-auto", children: _jsx(SelectGroup, { children: options.map(function (option) { return (_jsx(SelectItem, { value: option.value, children: option.label }, option.value)); }) }) })] }));
};
