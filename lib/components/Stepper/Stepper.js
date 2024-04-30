"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Container } from "./../../components/Container/Container";
import { PiCheckTickCircleContrast } from "./../../icons/PikaIcons";
function useStepper(initialStep, steps) {
    var _a = useState(initialStep), currentStep = _a[0], setCurrentStep = _a[1];
    var nextStep = function () {
        return setCurrentStep(function (prevStep) { return Math.min(prevStep + 1, steps.length - 1); });
    };
    var prevStep = function () { return setCurrentStep(function (prevStep) { return Math.max(prevStep - 1, 0); }); };
    var getCurrentStepContent = function () { return steps[currentStep]; };
    return {
        currentStep: currentStep,
        nextStep: nextStep,
        prevStep: prevStep,
        getCurrentStepContent: getCurrentStepContent,
        steps: steps,
    };
}
function Stepper(_a) {
    var _b;
    var stepper = _a.stepper;
    var complete = stepper.currentStep === stepper.steps.length - 1;
    return (_jsx(Container, { className: "p-6", children: _jsx("div", { className: "flex justify-between", children: (_b = stepper.steps) === null || _b === void 0 ? void 0 : _b.map(function (step, i) { return (_jsxs("div", { className: "step-item ".concat(stepper.currentStep === i ? "active" : "", " ").concat(i < stepper.currentStep ? "complete" : ""), children: [_jsx("div", { className: "step", children: i < stepper.currentStep ? _jsx(PiCheckTickCircleContrast, {}) : i + 1 }), _jsx("p", { className: "text-gray-500 text-xs md:text-sm font-medium pt-1", children: step })] }, i)); }) }) }));
}
export { Stepper, useStepper };
