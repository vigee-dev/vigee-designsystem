import { TypographyH1, TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
  className?: string;
  variant?: "sticky" | "default";
}

export function PageHeader({ title, subtitle, children, small, icon, className, variant = "sticky" }: PageHeaderProps) {
  return (
    <div className={cn(" top-0 z-40 py-1 items-center w-full", variant === "sticky" ? "bg-gray-50 " : "bg-white border border-gray-200 rounded-xl p-4")}>
      <div className={cn("rounded-xl h-fit items-center flex  md:flex-row justify-between gap-x-4  gap-2", className)}>
        <div className="flex items-center gap-4 ">
          {icon}
          <div className="flex flex-col ">
            {small ? <TypographyH2 className="text-primary m-0">{title}</TypographyH2> : <TypographyH1 className="text-primary m-0">{title}</TypographyH1>}
            {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
          </div>
        </div>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
