"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplashScreen = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var animejs_1 = __importDefault(require("animejs"));
var utils_1 = require("../../lib/utils");
var SplashScreen = function (_a) {
    var finishLoading = _a.finishLoading, className = _a.className;
    (0, react_2.useEffect)(function () {
        var loaderAnimation = animejs_1.default.timeline({
            complete: function () {
                finishLoading && finishLoading();
            },
        });
        loaderAnimation.add({
            targets: "#loader",
            duration: 300,
            delay: 0,
            scale: 1,
            easing: "linear",
        });
    }, [finishLoading]);
    return (<div className={(0, utils_1.cn)("flex h-screen w-screen bg-primary items-center justify-center", className)}>
      <span className="loader"></span>
    </div>);
};
exports.SplashScreen = SplashScreen;
