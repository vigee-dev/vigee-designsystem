"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var navigation_1 = require("next/navigation");
var select_1 = require("../ui/select");
var FilterableSelect = function (_a) {
    var items = _a.items, placeholder = _a.placeholder, query = _a.query, preselected = _a.preselected;
    var searchParams = (0, navigation_1.useSearchParams)();
    var pathname = (0, navigation_1.usePathname)();
    var replace = (0, navigation_1.useRouter)().replace;
    var _b = (0, react_1.useState)(preselected || null), selectedValue = _b[0], setSelectedValue = _b[1];
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
    return (<select_1.Select value={selectedValue || preselected} onValueChange={function (value) { return handleSelect(value); }}>
      <select_1.SelectTrigger>{selectedValue || placeholder}</select_1.SelectTrigger>
      <select_1.SelectContent>
        {items.map(function (item, index) { return (<select_1.SelectItem key={index} value={item.value}>
            {item.value}
          </select_1.SelectItem>); })}
      </select_1.SelectContent>
    </select_1.Select>);
};
exports.default = FilterableSelect;
