"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { FormField, FormItem, FormLabel } from "../../components/ui/form";
// TODO rethink the way this component handle changes
// TODO add onChange prop to handleChange withouth RHF
export function PlusLessButton(_a) {
    var title = _a.title, unit = _a.unit, _b = _a.interval, interval = _b === void 0 ? 0.5 : _b, _c = _a.min, min = _c === void 0 ? 0.5 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.start, start = _e === void 0 ? 1 : _e, form = _a.form, name = _a.name, onChange = _a.onChange;
    var _f = React.useState((form === null || form === void 0 ? void 0 : form.getValues(name)) ? form.getValues(name) : start), goal = _f[0], setGoal = _f[1];
    function onClick(adjustment) {
        var newValue = Math.max(min, Math.min(max, goal + adjustment));
        onChange && onChange(newValue);
        setGoal(newValue);
    }
    React.useEffect(function () {
        form === null || form === void 0 ? void 0 : form.setValue(name, goal, {
            shouldValidate: true,
        });
    }, [form, name, start, goal]);
    return (_jsx(FormField, { control: form === null || form === void 0 ? void 0 : form.control, name: name, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { className: "mx-auto w-full max-w-sm", children: [title && (_jsx(FormLabel, { className: "font-black text-primary", children: title })), _jsx("div", { className: " pb-0", children: _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsxs(Button, { type: "button", variant: "outline", size: "icon", className: "h-8 w-8 shrink-0 rounded-full", onClick: function () { return onClick(-interval); }, disabled: goal <= min, children: [_jsx(MinusIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Diminuer" })] }), _jsxs("div", { className: "flex-1 text-center", children: [_jsx("div", { className: "text-3xl font-bold tracking-tighter text-primary", children: goal }), _jsx("div", { className: "text-[0.70rem] uppercase text-muted-foreground", children: unit })] }), _jsxs(Button, { type: "button", variant: "outline", size: "icon", className: "h-8 w-8 shrink-0 rounded-full", onClick: function () { return onClick(interval); }, disabled: goal >= max, children: [_jsx(PlusIcon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Increase" })] })] }) })] }));
        } }));
}
