import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../lib/utils";

export const TitleBold = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  return (
    <TypographyH2 className={cn("text-slate-400 font-bold text-lg", className)}>
      {title}
    </TypographyH2>
  );
};
