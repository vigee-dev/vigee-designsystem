import { TypographyH1, TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, children, small, icon, className }: PageHeaderProps) {
  return (
    <div className={cn("rounded-xl h-fit bg-white p-5  border items-center mb-4 flex  md:flex-row justify-between gap-x-4 w-full gap-2", className)}>
      <div className="flex items-center gap-4 ">
        {icon}
        <div className="flex flex-col ">
          {small ? <TypographyH2 className="text-primary m-0">{title}</TypographyH2> : <TypographyH1 className="text-primary m-0">{title}</TypographyH1>}
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-x-4">{children}</div>
    </div>
  );
}
