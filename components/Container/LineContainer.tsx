import Link from "next/link";
import { TypographyH4 } from "../Typography/Typography";
import { ChevronRightIcon } from "../../icons/Chevrons";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  background?: string;
  icon?: React.ReactNode;
  href?: string;
}

// Petite fonction pour construire le contenu
const Content = ({ title, children, icon, background }: PageHeaderProps) => (
  <div
    className={`rounded-md h-fit p-5 mb-4 items-center bg-${background} ${
      background && "border"
    }`}
  >
    <div className="flex flex-wrap justify-between gap-x-4 w-full items-center">
      <div className="flex gap-x-4">
        {icon && <div className="icon-container">{icon}</div>}
        <TypographyH4>{title}</TypographyH4>
      </div>
      <div className="flex gap-x-4">
        <div className="hover:border rounded-md p-1 transistion-all duration-300 hover:cursor-pointer">
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  </div>
);

export function LineContainer({
  title,
  children,
  background,
  icon,
  href,
}: PageHeaderProps) {
  return href ? (
    <Link href={href}>
      <Content
        title={title}
        children={children}
        icon={icon}
        background={background}
      />
    </Link>
  ) : (
    <Content
      title={title}
      children={children}
      icon={icon}
      background={background}
    />
  );
}
