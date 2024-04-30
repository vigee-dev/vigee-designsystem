"use client";
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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../ui/hover-card";
import { cn } from "../lib/utils";
export default function TextArea(_a) {
    var form = _a.form, id = _a.id, name = _a.name, required = _a.required, label = _a.label, placeholder = _a.placeholder, count = _a.count, max = _a.max, _b = _a.minHeight, minHeight = _b === void 0 ? "32" : _b, defaultValue = _a.defaultValue, onBlur = _a.onBlur, onChange = _a.onChange, className = _a.className, descr = _a.descr, disabled = _a.disabled, helpComponent = _a.helpComponent;
    var _c = useState(0), charCount = _c[0], setCharCount = _c[1]; // État local pour le compteur de caractères
    return (_jsx(FormField, { control: form === null || form === void 0 ? void 0 : form.control, name: name, rules: { required: required }, render: function (_a) {
            var field = _a.field;
            return (_jsxs(FormItem, { children: [_jsxs(HoverCard, { children: [_jsxs("div", { className: "flex items-center justify-between ", children: [label && (_jsx(FormLabel, { className: "font-black text-primary mt-2", children: label })), helpComponent && (_jsx(HoverCardTrigger, { children: _jsx(PiQuestionMarkCircleDuoStroke, { className: "w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" }) }))] }), helpComponent && (_jsx(HoverCardContent, { children: _jsx("div", { className: "p-2", children: helpComponent }) }))] }), _jsx(Textarea, __assign({}, field, { placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "", onBlur: onBlur, onChange: function (e) {
                            if (count) {
                                setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
                            }
                            field.onChange(e);
                        }, className: cn("resize-none font-medium bg-input border-none text-[16px] md:text-sm col-span-full", className), disabled: disabled })), descr && _jsx(FormDescription, { children: descr }), _jsx(FormMessage, {})] }));
        } }));
}
