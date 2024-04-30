import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, } from "../ui/form";
import { Switch as SwitchShadcn } from "../ui/switch";
import { cn } from "../../lib/utils";
export default function Switch(_a) {
    var form = _a.form, label = _a.label, name = _a.name, descr = _a.descr, className = _a.className, onChange = _a.onChange, value = _a.value;
    return (form === null || form === void 0 ? void 0 : form.control) && name ? (_jsx(FormField, { control: form.control, name: name, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: cn("flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white", className), children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base ", children: label }), _jsx(FormDescription, { children: descr })] }), _jsx(FormControl, { children: _jsx(SwitchShadcn, { checked: field.value, onCheckedChange: field.onChange }) })] }));
        } })) : (_jsxs(FormItem, { className: cn("flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white", className), children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx(FormLabel, { className: "text-base ", children: label }), _jsx(FormDescription, { children: descr })] }), _jsx(FormControl, { children: _jsx(SwitchShadcn, { checked: value, onCheckedChange: onChange }) })] }));
}
