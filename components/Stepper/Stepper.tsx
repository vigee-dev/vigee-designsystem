"use client";

import { useState } from "react";
import { Container } from "./../../components/Container/Container";
import { PiCheckTickCircleContrast } from "./../../icons/PikaIcons";
import { cn } from "../../components/lib/utils";

type StepperHook<StepContent extends string> = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  getCurrentStepContent: () => StepContent;
  steps: StepContent[];
  className?: string;
};

function useStepper<StepContent extends string>(initialStep: number, steps: StepContent[], className?: string) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const nextStep = () => setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  const getCurrentStepContent = () => steps[currentStep];
  const goToStep = (step: number) => setCurrentStep(Math.max(0, Math.min(step, steps.length - 1))); // Ajout de la méthode goToStep

  return {
    currentStep,
    nextStep,
    prevStep,
    getCurrentStepContent,
    steps,
    className,
    goToStep,
  };
}

function Stepper<StepContent extends string>({ stepper, className }: { stepper: StepperHook<StepContent>; className?: string }) {
  const complete = stepper.currentStep === stepper.steps.length - 1;

  return (
    <Container className={cn("p-6", className)}>
      <div className="flex justify-between">
        {stepper.steps?.map((step, i) => (
          <div key={i} className={`step-item ${stepper.currentStep === i ? "active" : ""} ${i < stepper.currentStep ? "complete" : ""}`}>
            <div className="step">{i < stepper.currentStep ? <PiCheckTickCircleContrast /> : i + 1}</div>
            <p className={`${stepper.currentStep === i ? "text-black" : "text-gray-500"} text-xs md:text-sm font-medium pt-1`}>{step}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export { Stepper, useStepper };
