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
exports.SelectFilter = void 0;
var react_1 = __importStar(require("react"));
var navigation_1 = require("next/navigation");
var Select_1 = require("../../components/Select/Select");
var SelectFilter = function (_a) {
    var _b;
    var statusName = _a.statusName, status = _a.status, placeholder = _a.placeholder;
    var replace = (0, navigation_1.useRouter)().replace;
    var pathname = (0, navigation_1.usePathname)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var handleSearch = (0, react_1.useCallback)(function (status) {
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
    return (<Select_1.Select className="w-full md:w-auto" onChange={handleSearch} defaultValue={(_b = searchParams.get(statusName)) !== null && _b !== void 0 ? _b : ""} placeholder={placeholder} options={status}/>);
};
exports.SelectFilter = SelectFilter;
