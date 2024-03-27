import Link from "next/link";
import { TypographyH4 } from "../Typography/Typography";
import { ChevronRightIcon } from "../../icons/Chevrons";
import {
  PiChevronBigRightStroke,
  PiChevronRightSolid,
  PiChevronRightStroke,
} from "../../icons/PikaIcons";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  background?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

// Petite fonction pour construire le contenu
const Content = ({
  title,
  icon,
  background,
  children,
  onClick,
}: PageHeaderProps) => (
  <div
    className={`rounded-xl h-fit p-5 my-4 items-center bg-${background} border border-slate-200 hover:bg-slate-50 transition-ease-in-out duration-100 hover:cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex flex-wrap justify-between gap-x-4 w-full items-center">
      <div className="flex gap-x-4">
        {icon && <div className="icon-container text-gray-400">{icon}</div>}
        <TypographyH4>{title}</TypographyH4>
      </div>
      <div className="flex gap-x-4">
        <div className="rounded-md p-1 ">
          {children ? (
            children
          ) : (
            <PiChevronBigRightStroke className="text-gray-400 hover:text-primary transform ease-in-out duration-300" />
          )}
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
  onClick,
}: PageHeaderProps) {
  return href ? (
    <Link href={href}>
      <Content title={title} icon={icon} background={background} />
    </Link>
  ) : children ? (
    <Content
      title={title}
      icon={icon}
      background={background}
      onClick={onClick}
    >
      {children}
    </Content>
  ) : (
    <Content title={title} icon={icon} background={background} />
  );
}
