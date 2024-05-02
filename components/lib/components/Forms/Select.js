import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select as ShadSelect, SelectContent, SelectTrigger, SelectValue, } from "../ui/select";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../ui/hover-card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Label } from "../../components/ui/label";
export default function Select(_a) {
    var form = _a.form, label = _a.label, placeholder = _a.placeholder, _b = _a.required, required = _b === void 0 ? true : _b, name = _a.name, descr = _a.descr, children = _a.children, className = _a.className, disabled = _a.disabled, onChange = _a.onChange, value = _a.value, helpComponent = _a.helpComponent, _c = _a.isBoolean, isBoolean = _c === void 0 ? false : _c;
    return (form === null || form === void 0 ? void 0 : form.control) && name ? (_jsx(FormField, { control: form.control, name: name, rules: { required: required }, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: className, children: [_jsxs(HoverCard, { children: [_jsxs("div", { className: "flex items-center justify-between ", children: [label && (_jsx(FormLabel, { className: "font-black text-primary mt-2", children: label })), helpComponent && (_jsx(HoverCardTrigger, { children: _jsx(PiQuestionMarkCircleDuoStroke, { className: "w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" }) }))] }), helpComponent && (_jsx(HoverCardContent, { children: _jsx("div", { className: "p-2", children: helpComponent }) }))] }), _jsxs(ShadSelect, { onValueChange: function (e) {
                            if (!isBoolean) {
                                field.onChange(e);
                            }
                            else {
                                var eBoolean = e === "true";
                                field.onChange(eBoolean);
                            }
                        }, value: String(field.value), disabled: disabled, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { className: "font-medium bg-input border-none", children: _jsx(SelectValue, { placeholder: placeholder }) }) }), _jsx(SelectContent, { className: "max-h-[200px] font-medium", children: children })] }), descr && _jsx(FormDescription, { children: descr }), _jsx(FormMessage, {})] }));
        } })) : (_jsxs("div", { className: className, children: [label && _jsx(Label, { className: "font-black text-primary", children: label }), _jsxs(ShadSelect, { onValueChange: onChange, value: String(value), disabled: disabled, children: [_jsx(SelectTrigger, { className: "font-medium bg-input border-none", children: _jsx(SelectValue, { placeholder: placeholder }) }), _jsx(SelectContent, { className: "max-h-[200px] font-medium", children: children })] }), descr && _jsx("p", { className: "text-sm text-muted-foreground", children: descr })] }));
}
