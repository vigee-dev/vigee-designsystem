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
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import * as React from "react";
var Table = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("div", { className: "w-full overflow-auto border   sm:rounded-lg", children: _jsx("table", __assign({ ref: ref, className: cn("w-full caption-bottom text-sm  ", className) }, props)) }));
});
Table.displayName = "Table";
var TableHeader = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("thead", __assign({ ref: ref, className: cn("[&_tr]:border-0 ", className) }, props)));
});
TableHeader.displayName = "TableHeader";
var TableBody = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tbody", __assign({ ref: ref, className: cn("[&_tr:last-child]:border-0 ", className) }, props)));
});
TableBody.displayName = "TableBody";
var TableFooter = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tfoot", __assign({ ref: ref, className: cn("bg-primary font-medium text-primary-foreground ", className) }, props)));
});
TableFooter.displayName = "TableFooter";
var TableRow = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("tr", __assign({ ref: ref, className: cn("border-0 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted  bg-white ", className) }, props)));
});
TableRow.displayName = "TableRow";
var TableHead = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("th", __assign({ ref: ref, className: cn("font-black text-gray-500 h-12 px-4 text-left align-middle   [&:has([role=checkbox])]:pr-0 bg-light-grey ", className) }, props)));
});
TableHead.displayName = "TableHead";
var TableCell = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("td", __assign({ ref: ref, className: cn("p-2 px-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-600", className) }, props)));
});
TableCell.displayName = "TableCell";
var TableCaption = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (_jsx("caption", __assign({ ref: ref, className: cn("mt-4 text-sm text-muted-foreground ", className) }, props)));
});
TableCaption.displayName = "TableCaption";
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
