"use strict";
"use client";
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
exports.FadeInStagger = exports.FadeIn = void 0;
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var react_2 = __importDefault(require("react"));
var FadeInStaggerContext = (0, react_1.createContext)(false);
var viewport = { once: true, margin: "0px 0px -200px" };
function FadeIn(props) {
    var shouldReduceMotion = (0, framer_motion_1.useReducedMotion)();
    var isInStaggerGroup = (0, react_1.useContext)(FadeInStaggerContext);
    return (<framer_motion_1.motion.div variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
            visible: { opacity: 1, y: 0 },
        }} transition={{ duration: 0.5 }} {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: viewport,
        })} {...props}/>);
}
exports.FadeIn = FadeIn;
function FadeInStagger(_a) {
    var _b = _a.faster, faster = _b === void 0 ? false : _b, props = __rest(_a, ["faster"]);
    return (<FadeInStaggerContext.Provider value={true}>
      <framer_motion_1.motion.div initial="hidden" whileInView="visible" viewport={viewport} transition={{ staggerChildren: faster ? 0.12 : 0.2 }} {...props}/>
    </FadeInStaggerContext.Provider>);
}
exports.FadeInStagger = FadeInStagger;
