import Link from "next/link";
import { TypographyH4 } from "../Typography/Typography";
import { PiChevronBigRightStroke, PiChevronRightStroke } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
  background?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  subtitle?: string;
  minimalistic?: boolean;
}

const Content = ({ title, subtitle, icon, children, className }: Omit<PageHeaderProps, "href" | "onClick">) => (
  <div
    className={cn(
      "rounded-xl h-fit py-2 md:my-2 text-gray-600 hover:text-gray-900 items-center border-none  group transition-ease-in-out duration-100 hover:cursor-pointer bg-transparent transition-ease-in-out ",
      className
    )}>
    <div className="flex justify-between  w-full items-center ">
      <div className="flex gap-x-8 items-center">
        {icon && <div className="icon-container   ">{icon}</div>}
        <div className="flex flex-col px-2">
          <TypographyH4 className="text-xs md:text-base  font-bold   ">{title}</TypographyH4>
          {subtitle && <p className="text-gray-400 group-hover:text-gray-600 md:text-sm text-xs transition-ease-in-out duration-100 max-w-48 md:max-w-none">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-x-4  p-1 ">{children ? children : <PiChevronRightStroke className="text-gray-400 group-hover:text-gray-900 transform ease-in-out duration-300 h-6 w-6" />}</div>
    </div>
  </div>
);

export function LineContainer({ title, subtitle, children, background, icon, href, onClick, className, minimalistic }: PageHeaderProps) {
  // Si href est présent, utilisez Link pour la navigation
  if (href) {
    return (
      <Link href={href} passHref>
        <Content title={title} subtitle={subtitle} icon={icon} background={background} className={className} />
      </Link>
    );
  }

  // Sinon, appliquez l'événement onClick directement
  return (
    <div onClick={onClick}>
      <Content title={title} subtitle={subtitle} icon={icon} background={background} className={className}>
        {children}
      </Content>
    </div>
  );
}
