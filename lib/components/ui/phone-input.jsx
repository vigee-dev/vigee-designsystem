"use strict";
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
exports.PhoneInput = void 0;
var lucide_react_1 = require("lucide-react");
var React = __importStar(require("react"));
var RPNInput = __importStar(require("react-phone-number-input"));
var flags_1 = __importDefault(require("react-phone-number-input/flags"));
var button_1 = require("../../components/ui/button");
var command_1 = require("../../components/ui/command");
var input_1 = require("../../components/ui/input");
var popover_1 = require("../../components/ui/popover");
var utils_1 = require("../../lib/utils");
var PhoneInput = React.forwardRef(function (_a, ref) {
    var className = _a.className, onChange = _a.onChange, props = __rest(_a, ["className", "onChange"]);
    return (<RPNInput.default ref={ref} className={(0, utils_1.cn)("flex", className)} flagComponent={FlagComponent} countrySelectComponent={CountrySelect} inputComponent={InputComponent} 
    /**
     * Handles the onChange event.
     *
     * react-phone-number-input might trigger the onChange event as undefined
     * when a valid phone number is not entered. To prevent this,
     * the value is coerced to an empty string.
     *
     * @param {E164Number | undefined} value - The entered value
     */
    onChange={function (value) { return onChange === null || onChange === void 0 ? void 0 : onChange(value || ""); }} {...props}/>);
});
exports.PhoneInput = PhoneInput;
PhoneInput.displayName = "PhoneInput";
var InputComponent = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<input_1.Input className={(0, utils_1.cn)("rounded-s-none rounded-e-lg bg-input", className)} {...props} ref={ref}/>);
});
InputComponent.displayName = "InputComponent";
var CountrySelect = function (_a) {
    var disabled = _a.disabled, value = _a.value, onChange = _a.onChange, options = _a.options;
    var handleSelect = React.useCallback(function (country) {
        onChange(country);
    }, [onChange]);
    return (<popover_1.Popover>
      <popover_1.PopoverTrigger asChild>
        <button_1.Button type="button" variant={"outline"} className={(0, utils_1.cn)("flex gap-1 rounded-e-none rounded-s-lg pr-1 pl-3")} disabled={disabled}>
          <FlagComponent country={value} countryName={value}/>
          <lucide_react_1.ChevronsUpDown className={(0, utils_1.cn)("h-4 w-4 opacity-50", disabled ? "hidden" : "opacity-100")}/>
        </button_1.Button>
      </popover_1.PopoverTrigger>
      <popover_1.PopoverContent className="p-0 w-[300px]">
        <command_1.Command>
          <command_1.CommandList>
            <command_1.CommandInput placeholder="Chercher un pays..."/>
            <command_1.CommandEmpty>Pays non trouvé.</command_1.CommandEmpty>
            <command_1.CommandGroup>
              {options
            .filter(function (x) { return x.value; })
            .map(function (option) { return (<command_1.CommandItem className="gap-2" key={option.value} onSelect={function () { return handleSelect(option.value); }}>
                    <FlagComponent country={option.value} countryName={option.label}/>
                    <span className="text-sm flex-1">{option.label}</span>
                    {option.value && (<span className="text-sm text-foreground/50">
                        {"+".concat(RPNInput.getCountryCallingCode(option.value))}
                      </span>)}
                    <lucide_react_1.CheckIcon className={(0, utils_1.cn)("ml-auto h-4 w-4", option.value === value ? "opacity-100" : "opacity-0")}/>
                  </command_1.CommandItem>); })}
            </command_1.CommandGroup>
          </command_1.CommandList>
        </command_1.Command>
      </popover_1.PopoverContent>
    </popover_1.Popover>);
};
var FlagComponent = function (_a) {
    var country = _a.country, countryName = _a.countryName;
    var Flag = flags_1.default[country];
    return (<span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName}/>}
    </span>);
};
FlagComponent.displayName = "FlagComponent";
