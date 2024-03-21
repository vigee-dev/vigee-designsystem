"use client";

import * as React from "react";

import { Progress } from "../../components/ui/progress";

interface Props {
  progress: number;
  text?: string;
}

export function ProgressBar({ progress, text }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Progress value={progress} className="w-[60%]" />
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
}
