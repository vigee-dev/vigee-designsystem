"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStepper = exports.Stepper = void 0;
var react_1 = __importStar(require("react"));
var Container_1 = require("./../../components/Container/Container");
var PikaIcons_1 = require("./../../icons/PikaIcons");
function useStepper(initialStep, steps) {
    var _a = (0, react_1.useState)(initialStep), currentStep = _a[0], setCurrentStep = _a[1];
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
exports.useStepper = useStepper;
function Stepper(_a) {
    var _b;
    var stepper = _a.stepper;
    var complete = stepper.currentStep === stepper.steps.length - 1;
    return (<Container_1.Container className="p-6">
      <div className="flex justify-between">
        {(_b = stepper.steps) === null || _b === void 0 ? void 0 : _b.map(function (step, i) { return (<div key={i} className={"step-item ".concat(stepper.currentStep === i ? "active" : "", " ").concat(i < stepper.currentStep ? "complete" : "")}>
            <div className="step">
              {i < stepper.currentStep ? <PikaIcons_1.PiCheckTickCircleContrast /> : i + 1}
            </div>
            <p className="text-gray-500 text-xs md:text-sm font-medium pt-1">
              {step}
            </p>
          </div>); })}
      </div>
    </Container_1.Container>);
}
exports.Stepper = Stepper;
