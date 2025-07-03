import { cn } from "../lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return <span className={cn("w-6 h-6 border-[5px]   animate-[spin_2s_linear_infinite]  border-t-[5px] border-t-solid border-t-primary  rounded-full transition-transform  ease-in-outout z-50", className)} />;
};
