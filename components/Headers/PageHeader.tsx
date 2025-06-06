import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;
  small?: boolean;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "ghost";
  iconClassName?: string;
  classNameTitle?: string;
  classNameSubtitle?: string;
}

export function PageHeader({
  title,
  subtitle,
  children,
  small,
  icon,
  className,
  variant = "default",
  iconClassName,
  classNameTitle,
  classNameSubtitle,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "rounded-xl h-fit items-center flex md:flex-row justify-between gap-x-4 w-full gap-2",
        variant === "ghost"
          ? ""
          : "bg-white border border-gray-200 rounded-xl p-4",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {icon && <div className={iconClassName}>{icon}</div>}
        <div className="flex flex-col">
          <TypographyH2
            className={cn(
              "text-primary m-0 p-0 font-bold text-2xl",
              classNameTitle
            )}
          >
            {title}
          </TypographyH2>
          {subtitle && (
            <p className={cn("text-gray-400 text-sm", classNameSubtitle)}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-x-4">{children}</div>
    </div>
  );
}
