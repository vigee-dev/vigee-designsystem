import { TypographyH3, TypographyH4 } from "../Typography/Typography";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  background?: string;
  icon?: React.ReactNode;
}

export function LineContainer({
  title,
  children,
  background,
  icon,
}: PageHeaderProps) {
  return (
    <div
      className={`rounded-md h-fit p-5 mb-4 items-center  bg-${background} ${
        background && "border"
      }`}
    >
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        {icon && <div className="icon-container">{icon}</div>}{" "}
        {/* Affichage de l'icône */}
        <TypographyH4>{title}</TypographyH4>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>
  );
}
