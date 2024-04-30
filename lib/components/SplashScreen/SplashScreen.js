import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import anime from "animejs";
import { cn } from "../../lib/utils";
export var SplashScreen = function (_a) {
    var finishLoading = _a.finishLoading, className = _a.className;
    useEffect(function () {
        var loaderAnimation = anime.timeline({
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
    return (_jsx("div", { className: cn("flex h-screen w-screen bg-primary items-center justify-center", className), children: _jsx("span", { className: "loader" }) }));
};
