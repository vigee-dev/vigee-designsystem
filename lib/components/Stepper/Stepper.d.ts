import React from "react";
type StepperHook<StepContent extends string> = {
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    getCurrentStepContent: () => StepContent;
    steps: StepContent[];
};
declare function useStepper<StepContent extends string>(initialStep: number, steps: StepContent[]): {
    currentStep: number;
    nextStep: () => void;
    prevStep: () => void;
    getCurrentStepContent: () => StepContent;
    steps: StepContent[];
};
declare function Stepper<StepContent extends string>({ stepper, }: {
    stepper: StepperHook<StepContent>;
}): React.JSX.Element;
export { Stepper, useStepper };