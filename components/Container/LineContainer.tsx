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
  <div className={cn("rounded-xl h-fit px-4 py-4 md:my-4 items-center border-none  hover:bg-zinc-100 transition-ease-in-out duration-100 hover:cursor-pointer bg-transparent md:bg-white ", className)}>
    <div className="flex justify-between  w-full items-center">
      <div className="flex gap-x-10 items-center">
        {icon && <div className="icon-container text-gray-400">{icon}</div>}
        <div className="flex flex-col px-2">
          <TypographyH4 className="md:text-base text-sm font-bold">{title}</TypographyH4>
          {subtitle && <p className="text-gray-400 md:text-sm text-xs">{subtitle}</p>}
        </div>
      </div>
      <div className="flex gap-x-4  p-1 ">{children ? children : <PiChevronRightStroke className="text-gray-400 hover:text-primary transform ease-in-out duration-300 h-6 w-6" />}</div>
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
      <Content title={title} icon={icon} background={background}>
        {children}
      </Content>
    </div>
  );
}
