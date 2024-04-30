"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "../../components/Select/Select";
export var SelectFilter = function (_a) {
    var _b;
    var statusName = _a.statusName, status = _a.status, placeholder = _a.placeholder;
    var replace = useRouter().replace;
    var pathname = usePathname();
    var searchParams = useSearchParams();
    var handleSearch = useCallback(function (status) {
        var params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        if (status === undefined ||
            status === searchParams.get(statusName) ||
            status === "") {
            params.delete(statusName);
        }
        else {
            params.set(statusName, status);
        }
        replace("".concat(pathname, "?").concat(params.toString()));
    }, [searchParams, statusName]);
    return (_jsx(Select, { className: "w-full md:w-auto", onChange: handleSearch, defaultValue: (_b = searchParams.get(statusName)) !== null && _b !== void 0 ? _b : "", placeholder: placeholder, options: status }));
};
