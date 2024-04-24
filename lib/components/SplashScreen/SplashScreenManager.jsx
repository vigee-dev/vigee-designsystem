"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SplashScreen_1 = require("./SplashScreen");
function SplashScreenManager(_a) {
    var className = _a.className, children = _a.children;
    var _b = (0, react_1.useState)(true), showSplashScreen = _b[0], setShowSplashScreen = _b[1];
    var finishLoading = function () {
        setShowSplashScreen(false);
    };
    return showSplashScreen ? (<div className="h-screen items-center mx-auto flex justify-center">
      <SplashScreen_1.SplashScreen finishLoading={finishLoading} className={className}/>
    </div>) : (children);
}
exports.default = SplashScreenManager;
