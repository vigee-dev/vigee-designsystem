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
exports.Select = void 0;
var React = __importStar(require("react"));
var select_1 = require("../../components/ui/select");
var utils_1 = require("../../lib/utils");
var label_1 = require("../ui/label");
function Select(_a) {
    var options = _a.options, _b = _a.placeholder, placeholder = _b === void 0 ? "Sélectionnez une valeur" : _b, onChange = _a.onChange, className = _a.className, disabled = _a.disabled, defaultValue = _a.defaultValue, label = _a.label;
    var _c = React.useState(defaultValue || undefined), selectedValue = _c[0], setSelectedValue = _c[1];
    var groupedOptions = options.reduce(function (acc, option) {
        var group = option.group || "Ungrouped"; // Default group name for ungrouped items
        if (!acc[group]) {
            acc[group] = [];
        }
        acc[group].push(option);
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
    return (<select_1.Select onValueChange={handleValueChange} defaultValue={selectedValue} disabled={disabled}>
      {label && <label_1.Label className="font-black text-primary mt-2">{label}</label_1.Label>}

      <select_1.SelectTrigger className={(0, utils_1.cn)("w-[280px] font-medium bg-input", className)}>
        <select_1.SelectValue placeholder={placeholder}/>
      </select_1.SelectTrigger>
      <select_1.SelectContent className={(0, utils_1.cn)("max-h-[200px] font-medium", className)}>
        {Object.entries(groupedOptions).map(function (_a) {
            var groupName = _a[0], groupOptions = _a[1];
            return (<select_1.SelectGroup key={groupName}>
            {/* Only render the SelectLabel if the group name is not 'Ungrouped' */}
            {groupName !== "Ungrouped" && (<select_1.SelectLabel>{groupName}</select_1.SelectLabel>)}
            {groupOptions.map(function (option) { return (<select_1.SelectItem key={option.value} value={option.value}>
                {option.label}
              </select_1.SelectItem>); })}
          </select_1.SelectGroup>);
        })}
      </select_1.SelectContent>
    </select_1.Select>);
}
exports.Select = Select;
