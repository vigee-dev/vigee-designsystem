import Link from "next/link";
import { TypographyH4 } from "../Typography/Typography";
import { PiChevronBigRightStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  background?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const Content = ({
  title,
  icon,
  children,
  className,
}: Omit<PageHeaderProps, "href" | "onClick">) => (
  <div
    className={cn(
      "rounded-xl h-fit p-5 my-4 items-center border border-slate-200 hover:bg-slate-50 transition-ease-in-out duration-100 hover:cursor-pointer bg-white ",
      className
    )}
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
  className,
}: PageHeaderProps) {
  // Si href est présent, utilisez Link pour la navigation
  if (href) {
    return (
      <Link href={href} passHref>
        <Content
          title={title}
          icon={icon}
          background={background}
          className={className}
        />
      </Link>
    );
  }

  // Sinon, appliquez l'événement onClick directement
  return (
    <div onClick={onClick}>
      <Content title={title} icon={icon} background={background}>
        {children}
      </Content>
    </div>
  );
}
