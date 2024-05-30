import { TypographyH2 } from "../Typography/Typography";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="flex flex-col">
      <TypographyH2 className="text-primary font-medium">{title}</TypographyH2>
      <p className="text-sm text-gray-400 font-disaply font-variations">
        {subtitle}
      </p>
    </div>
  );
};
