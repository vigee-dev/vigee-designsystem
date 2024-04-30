import { TypographyH2 } from "../Typography/Typography";
import { cn } from "../../lib/utils";
import Link from "next/link";

interface AddButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  icon: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  href?: string;
}

const ButtonAdd: React.FC<AddButtonProps> = ({
  text,
  icon,
  type = "button",
  className,
  onClick,
  href,
}) => {
  return href ? (
    <Link href={href}>
      <button
        type={type}
        className={cn(
          `flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer `,
          className
        )}
      >
        {icon}
        <TypographyH2 className="text-md">{text}</TypographyH2>
      </button>
    </Link>
  ) : (
    <button
      type={type}
      className={cn(
        `flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer `,
        className
      )}
      onClick={onClick}
    >
      {icon}
      <TypographyH2 className="text-md">{text}</TypographyH2>
    </button>
  );
};

export default ButtonAdd;
