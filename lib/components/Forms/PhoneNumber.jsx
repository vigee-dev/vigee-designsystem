"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../../components/ui/form");
var utils_1 = require("../../lib/utils");
var phone_input_1 = require("../ui/phone-input");
var react_1 = __importDefault(require("react"));
function PhoneNumber(_a) {
    var form = _a.form, name = _a.name, _b = _a.label, label = _b === void 0 ? "Téléphone mobile" : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "ex : 0695069999" : _c, description = _a.description, _d = _a.required, required = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, className = _a.className;
    return (<form_1.FormField control={form === null || form === void 0 ? void 0 : form.control} name={name} rules={{ required: required }} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className={(0, utils_1.cn)("flex flex-col items-start", className)}>
          {label && (<form_1.FormLabel className="font-black text-primary mt-2">
              {label}
            </form_1.FormLabel>)}
          <form_1.FormControl className="w-full">
            <phone_input_1.PhoneInput disabled={disabled} placeholder={placeholder} {...field} defaultCountry="FR"/>
          </form_1.FormControl>
          {description && (<form_1.FormDescription className="text-left">
              {description}
            </form_1.FormDescription>)}
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>);
}
exports.default = PhoneNumber;
