"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { SplashScreen } from "./SplashScreen";
export default function SplashScreenManager(_a) {
    var className = _a.className, children = _a.children;
    var _b = useState(true), showSplashScreen = _b[0], setShowSplashScreen = _b[1];
    var finishLoading = function () {
        setShowSplashScreen(false);
    };
    return showSplashScreen ? (_jsx("div", { className: "h-screen items-center mx-auto flex justify-center", children: _jsx(SplashScreen, { finishLoading: finishLoading, className: className }) })) : (children);
}
