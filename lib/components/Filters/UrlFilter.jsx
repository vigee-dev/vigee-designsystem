"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlFilter = void 0;
var nuqs_1 = require("nuqs");
var select_1 = require("../../components/ui/select");
var react_1 = __importDefault(require("react"));
var UrlFilter = function (_a) {
    var name = _a.name, options = _a.options, placeholder = _a.placeholder, _b = _a.type, type = _b === void 0 ? "string" : _b, defaultValue = _a.defaultValue;
    var _c = (0, nuqs_1.useQueryState)(name, {
        defaultValue: defaultValue || '',
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
    return (<select_1.Select onValueChange={handleValueChange} defaultValue={filter}>
      <select_1.SelectTrigger className="w-fit">
        <select_1.SelectValue placeholder={placeholder}/>
      </select_1.SelectTrigger>
      <select_1.SelectContent className="w-full md:w-auto">
        <select_1.SelectGroup>
          {options.map(function (option) { return (<select_1.SelectItem key={option.value} value={option.value}>
              {option.label}
            </select_1.SelectItem>); })}
        </select_1.SelectGroup>
      </select_1.SelectContent>
    </select_1.Select>);
};
exports.UrlFilter = UrlFilter;
