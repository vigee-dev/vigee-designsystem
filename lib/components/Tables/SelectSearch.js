"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectContent, SelectItem, } from "../ui/select";
var FilterableSelect = function (_a) {
    var items = _a.items, placeholder = _a.placeholder, query = _a.query, preselected = _a.preselected;
    var searchParams = useSearchParams();
    var pathname = usePathname();
    var replace = useRouter().replace;
    var _b = useState(preselected || null), selectedValue = _b[0], setSelectedValue = _b[1];
    var handleSelect = function (value) {
        var params = new URLSearchParams(searchParams.toString());
        params.set(query, preselected || value);
        if (value) {
            params.set(query, value);
            setSelectedValue(value);
        }
        else {
            params.delete(query);
            setSelectedValue(null);
        }
        replace("".concat(pathname, "?").concat(params.toString()));
    };
    return (_jsxs(Select, { value: selectedValue || preselected, onValueChange: function (value) { return handleSelect(value); }, children: [_jsx(SelectTrigger, { children: selectedValue || placeholder }), _jsx(SelectContent, { children: items.map(function (item, index) { return (_jsx(SelectItem, { value: item.value, children: item.value }, index)); }) })] }));
};
export default FilterableSelect;
