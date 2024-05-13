import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { cn } from "../lib/utils";
import {
  PiSendPlaneHorizontalContrast,
  PiEye02OnContrast,
  PiPlusSquareDuoSolid,
  PiDownloadDownDuoSolid,
  PiDeleteDustbin01DuoStroke,
  PiUploadUpDuoSolid,
  PiArrowLeftStroke,
  PiPencilEditBoxDuoSolid,
  PiArrowLeftCircleContrast,
  PiUserPlusContrast,
  PiCopyCopiedDuoSolid,
  PiChevronRightStroke,
  PiPlusDefaultStroke,
  PiSearchDefaultStroke,
  PiCameraStroke,
  PiDeleteDustbin01DuoSolid,
  PiFilterFunnelContrast,
} from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";
import { Loader2 } from "lucide-react";
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  href?: string;
  className?: string;
  pending?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  icon?: keyof typeof iconMap;
  iconComponent?: React.ReactNode;
  tooltip?: string;
  big?: boolean;
}

const iconMap = {
  send: PiSendPlaneHorizontalContrast,
  view: PiEye02OnContrast,
  add: PiPlusSquareDuoSolid,
  download: PiDownloadDownDuoSolid,
  trash: PiDeleteDustbin01DuoSolid,
  upload: PiUploadUpDuoSolid,
  back: PiArrowLeftStroke,
  edit: PiPencilEditBoxDuoSolid,
  arrowLeft: PiArrowLeftCircleContrast,
  user: PiUserPlusContrast,
  copy: PiCopyCopiedDuoSolid,
  chevron: PiChevronRightStroke,
  search: PiSearchDefaultStroke,
  plus: PiPlusDefaultStroke,
  camera: PiCameraStroke,
  filter: PiFilterFunnelContrast,
};

export function Button({
  children,
  onClick,
  variant,
  type = "button",
  disabled,
  href,
  className,
  pending,
  icon,
  iconComponent,
  tooltip,
  big,
}: ButtonProps) {
  return pending ? (
    <ButtonComponent disabled variant={variant} className={className}>
      {children} <Loader2 className={`mr-2 h-4 w-4 animate-spin `} />
    </ButtonComponent>
  ) : href ? (
    <Link href={href}>
      <ButtonComponent
        variant={variant}
        icon={icon}
        iconComponent={iconComponent}
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
        tooltip={tooltip}
        big={big}
      >
        {children}
      </ButtonComponent>
    </Link>
  ) : (
    <ButtonComponent
      variant={variant}
      icon={icon}
      iconComponent={iconComponent}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      tooltip={tooltip}
      big={big}
    >
      {children}
    </ButtonComponent>
  );
}

interface ButtonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: keyof typeof iconMap;
  iconComponent?: React.ReactNode;
  tooltip?: string;
  big?: boolean;
}

const ButtonComponent = ({
  children,
  onClick,
  variant,
  type,
  disabled,
  className,
  icon,
  iconComponent,
  tooltip,
  big,
}: ButtonComponentProps) => {
  const Icon = icon ? iconMap[icon] : null;

  return tooltip ? (
    <Tooltip message={tooltip ?? ""}>
      <ShadButton
        variant={variant}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={cn(
          "group group-hover:text-primary rounded-xl group-hover:cursor-pointer font-bold text-sm flex  px-3 gap-4 ",
          className,
          !children &&
            "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
        )}
      >
        {children}

        {iconComponent}

        {Icon && (
          <Icon
            className={cn(
              "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
              className,
              !children &&
                "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-6 h-6",
              big && "w-10 h-10",
              variant === "outline" && "text-gray-900",
              variant === "secondary" && "text-secondary-foreground"
            )}
          />
        )}
      </ShadButton>
    </Tooltip>
  ) : (
    <ShadButton
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "group group-hover:text-primary rounded-xl group-hover:cursor-pointer font-bold text-sm flex  gap-4 ",
        className,
        !children &&
          "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
      )}
    >
      {children}
      {iconComponent}

      {Icon && (
        <Icon
          className={cn(
            "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",

            !children &&
              "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300  w-6 h-6",
            big && "w-10 h-10",
            variant === "outline" && "text-gray-900",
            variant === "secondary" && "text-secondary-foreground"
          )}
        />
      )}
    </ShadButton>
  );
};
