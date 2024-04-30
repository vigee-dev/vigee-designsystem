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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Input as ShadInput } from "../ui/input";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { HoverCard, HoverCardTrigger, HoverCardContent, } from "../ui/hover-card";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
export default function Input(_a) {
    var form = _a.form, label = _a.label, placeholder = _a.placeholder, _b = _a.type, type = _b === void 0 ? "text" : _b, _c = _a.required, required = _c === void 0 ? true : _c, name = _a.name, descr = _a.descr, className = _a.className, disabled = _a.disabled, id = _a.id, min = _a.min, max = _a.max, step = _a.step, helpComponent = _a.helpComponent, onChange = _a.onChange, value = _a.value;
    return form && name ? (_jsx(FormField, { control: form === null || form === void 0 ? void 0 : form.control, name: name, rules: { required: required }, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: className, children: [_jsxs(HoverCard, { children: [_jsxs("div", { className: "flex items-center justify-between ", children: [label && (_jsx(FormLabel, { className: "font-black text-primary mt-2", children: label })), helpComponent && (_jsx(HoverCardTrigger, { children: _jsx(PiQuestionMarkCircleDuoStroke, { className: "w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" }) }))] }), helpComponent && (_jsx(HoverCardContent, { children: _jsx("div", { className: "p-2", children: helpComponent }) })), _jsx(FormControl, { children: _jsx(ShadInput, __assign({ placeholder: placeholder }, field, { type: type, disabled: disabled, id: id, min: min, max: max, step: step, className: "text-[16px] md:text-sm font-medium bg-input border-none" })) })] }), descr && _jsx(FormDescription, { children: descr }), _jsx(FormMessage, {})] }));
        } })) : (_jsxs("div", { className: cn("space-y-2", className), children: [_jsxs(HoverCard, { children: [_jsxs("div", { className: "flex items-center justify-between py-1", children: [label && _jsx(Label, { className: "font-black text-primary", children: label }), helpComponent && (_jsx(HoverCardTrigger, { children: _jsx(PiQuestionMarkCircleDuoStroke, { className: "w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" }) }))] }), helpComponent && (_jsx(HoverCardContent, { children: _jsx("div", { className: "p-2", children: helpComponent }) })), _jsx(ShadInput, { placeholder: placeholder, type: type, disabled: disabled, id: id, min: min, max: max, step: step, onChange: onChange, value: value, className: "text-[16px] md:text-sm font-medium bg-input border-none" })] }), descr && _jsx("p", { className: "text-sm text-muted-foreground", children: descr })] }));
}
