import { cn } from "../lib/utils";
import { TypographyH2 } from "../Typography/Typography";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <TypographyH2 className="text-primary font-bold text-2xl">
        {title}
      </TypographyH2>
      <p className="text-sm text-slate-400 font-disaply font-variations">
        {subtitle}
      </p>
    </div>
  );
};
