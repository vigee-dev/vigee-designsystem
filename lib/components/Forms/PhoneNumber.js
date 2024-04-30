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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../../components/ui/form";
import { cn } from "../lib/utils";
import { PhoneInput } from "../ui/phone-input";
export default function PhoneNumber(_a) {
    var form = _a.form, name = _a.name, _b = _a.label, label = _b === void 0 ? "Téléphone mobile" : _b, _c = _a.placeholder, placeholder = _c === void 0 ? "ex : 0695069999" : _c, description = _a.description, _d = _a.required, required = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, className = _a.className;
    return (_jsx(FormField, { control: form === null || form === void 0 ? void 0 : form.control, name: name, rules: { required: required }, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: cn("flex flex-col items-start", className), children: [label && (_jsx(FormLabel, { className: "font-black text-primary mt-2", children: label })), _jsx(FormControl, { className: "w-full", children: _jsx(PhoneInput, __assign({ disabled: disabled, placeholder: placeholder }, field, { defaultCountry: "FR" })) }), description && (_jsx(FormDescription, { className: "text-left", children: description })), _jsx(FormMessage, {})] }));
        } }));
}
