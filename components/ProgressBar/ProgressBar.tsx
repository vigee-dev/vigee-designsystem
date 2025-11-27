"use client";

import { Progress } from "../ui/progress";

interface Props {
  progress: number;
  text?: string;
}

export function ProgressBar({ progress, text }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Progress value={progress} className="w-[60%] bg-gray-300" />
      {text && <p className="mt-2 text-md text-gray-500">{text}</p>}
    </div>
  );
}
