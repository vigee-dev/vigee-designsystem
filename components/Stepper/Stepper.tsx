"use client";

import React, { useState } from "react";
import { Container } from "./../../components/Container/Container";
import { PiCheckTickCircleContrast } from "./../../icons/PikaIcons";

type StepperHook<StepContent extends string> = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  getCurrentStepContent: () => StepContent;
  steps: StepContent[];
};

function useStepper<StepContent extends string>(
  initialStep: number,
  steps: StepContent[]
) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const nextStep = () =>
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  const getCurrentStepContent = () => steps[currentStep];

  return {
    currentStep,
    nextStep,
    prevStep,
    getCurrentStepContent,
    steps,
  };
}

function Stepper<StepContent extends string>({
  stepper,
}: {
  stepper: StepperHook<StepContent>;
}) {
  const complete = stepper.currentStep === stepper.steps.length - 1;

  return (
    <Container className="p-6">
      <div className="flex justify-between">
        {stepper.steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${
              stepper.currentStep === i ? "active" : ""
            } ${i < stepper.currentStep ? "complete" : ""}`}
          >
            <div className="step">
              {i < stepper.currentStep ? <PiCheckTickCircleContrast /> : i + 1}
            </div>
            <p className="text-gray-500 text-xs md:text-sm font-medium pt-1">
              {step}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export { Stepper, useStepper };
