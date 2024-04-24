"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCaption = exports.TableCell = exports.TableRow = exports.TableHead = exports.TableFooter = exports.TableBody = exports.TableHeader = exports.Table = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../lib/utils");
var Table = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className="w-full overflow-auto border   sm:rounded-lg">
    <table ref={ref} className={(0, utils_1.cn)("w-full caption-bottom text-sm  ", className)} {...props}/>
  </div>);
});
exports.Table = Table;
Table.displayName = "Table";
var TableHeader = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<thead ref={ref} className={(0, utils_1.cn)("[&_tr]:border-0 ", className)} {...props}/>);
});
exports.TableHeader = TableHeader;
TableHeader.displayName = "TableHeader";
var TableBody = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tbody ref={ref} className={(0, utils_1.cn)("[&_tr:last-child]:border-0 ", className)} {...props}/>);
});
exports.TableBody = TableBody;
TableBody.displayName = "TableBody";
var TableFooter = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tfoot ref={ref} className={(0, utils_1.cn)("bg-primary font-medium text-primary-foreground ", className)} {...props}/>);
});
exports.TableFooter = TableFooter;
TableFooter.displayName = "TableFooter";
var TableRow = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<tr ref={ref} className={(0, utils_1.cn)("border-0 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted  bg-white ", className)} {...props}/>);
});
exports.TableRow = TableRow;
TableRow.displayName = "TableRow";
var TableHead = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<th ref={ref} className={(0, utils_1.cn)("font-black text-gray-500 h-12 px-4 text-left align-middle   [&:has([role=checkbox])]:pr-0 bg-light-grey ", className)} {...props}/>);
});
exports.TableHead = TableHead;
TableHead.displayName = "TableHead";
var TableCell = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<td ref={ref} className={(0, utils_1.cn)("p-2 px-4 align-middle [&:has([role=checkbox])]:pr-0 text-sm text-gray-600", className)} {...props}/>);
});
exports.TableCell = TableCell;
TableCell.displayName = "TableCell";
var TableCaption = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<caption ref={ref} className={(0, utils_1.cn)("mt-4 text-sm text-muted-foreground ", className)} {...props}/>);
});
exports.TableCaption = TableCaption;
TableCaption.displayName = "TableCaption";
