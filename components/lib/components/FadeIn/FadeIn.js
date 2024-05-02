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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
var FadeInStaggerContext = createContext(false);
var viewport = { once: true, margin: "0px 0px -200px" };
export function FadeIn(props) {
    var shouldReduceMotion = useReducedMotion();
    var isInStaggerGroup = useContext(FadeInStaggerContext);
    return (_jsx(motion.div, __assign({ variants: {
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
            visible: { opacity: 1, y: 0 },
        }, transition: { duration: 0.5 } }, (isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewport,
        }), props)));
}
export function FadeInStagger(_a) {
    var _b = _a.faster, faster = _b === void 0 ? false : _b, props = __rest(_a, ["faster"]);
    return (_jsx(FadeInStaggerContext.Provider, { value: true, children: _jsx(motion.div, __assign({ initial: "hidden", whileInView: "visible", viewport: viewport, transition: { staggerChildren: faster ? 0.12 : 0.2 } }, props)) }));
}
