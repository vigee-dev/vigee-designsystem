import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { cn } from "../lib/utils";
import {
  PiSendPlaneHorizontalContrast,
  PiEye02OnContrast,
  PiPlusSquareDuoSolid,
  PiDownloadDownDuoSolid,
  PiUploadUpDuoSolid,
  PiArrowLeftStroke,
  PiPencilEditBoxDuoSolid,
  PiArrowLeftCircleContrast,
  PiUserPlusContrast,
  PiChevronRightStroke,
  PiPlusDefaultStroke,
  PiSearchDefaultStroke,
  PiCameraStroke,
  PiDeleteDustbin01DuoSolid,
  PiFilterFunnelContrast,
  PiCalendarFilledStroke,
  PiRefreshDuoStroke,
  PiLogOutRightDuoStroke,
  PiNavigationSlantStroke,
  PiChevronDownStroke,
  PiGithubStroke,
  PiGoogleStroke,
  PiAppleLogoStroke,
  PiCopyCopiedStroke,
  PiThreeDotsMenuHorizontalStroke,
  PiCheckTickSingleStroke,
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
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  icon?: keyof typeof iconMap;
  iconLeft?: keyof typeof iconMap;
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
  copy: PiCopyCopiedStroke,
  chevron: PiChevronRightStroke,
  search: PiSearchDefaultStroke,
  plus: PiPlusDefaultStroke,
  camera: PiCameraStroke,
  filter: PiFilterFunnelContrast,
  calendar: PiCalendarFilledStroke,
  refresh: PiRefreshDuoStroke,
  logout: PiLogOutRightDuoStroke,
  navigation: PiNavigationSlantStroke,
  chevronDown: PiChevronDownStroke,
  github: PiGithubStroke,
  google: PiGoogleStroke,
  apple: PiAppleLogoStroke,
  dots: PiThreeDotsMenuHorizontalStroke,
  check: PiCheckTickSingleStroke,
};

export function Button({ children, onClick, variant, type = "button", disabled, href, className, pending, icon, iconLeft, iconComponent, tooltip, big }: ButtonProps) {
  return pending ? (
    <ButtonComponent disabled variant={variant} className={className}>
      {children}
      <Loader2 className={cn(` h-4 w-4 animate-spin `, children ? "mr-2" : "mr-0")} />
    </ButtonComponent>
  ) : href ? (
    <Link href={href}>
      <ButtonComponent
        variant={variant}
        icon={icon}
        iconLeft={iconLeft}
        iconComponent={iconComponent}
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
        tooltip={tooltip}
        big={big}>
        {children}
      </ButtonComponent>
    </Link>
  ) : (
    <ButtonComponent
      variant={variant}
      icon={icon}
      iconLeft={iconLeft}
      iconComponent={iconComponent}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      tooltip={tooltip}
      big={big}>
      {children}
    </ButtonComponent>
  );
}

interface ButtonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: keyof typeof iconMap;
  iconLeft?: keyof typeof iconMap;
  iconComponent?: React.ReactNode;
  tooltip?: string;
  big?: boolean;
}

const ButtonComponent = ({ children, onClick, variant, type, disabled, className, icon, iconLeft, iconComponent, tooltip, big }: ButtonComponentProps) => {
  const Icon = icon ? iconMap[icon] : null;
  const IconLeft = iconLeft ? iconMap[iconLeft] : null;

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
          !children && "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
        )}>
        {IconLeft && (
          <IconLeft
            className={cn(
              "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
              className,
              !children &&
                "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300  w-6 h-6",
              big && "w-10 h-10",
              variant === "outline" && "text-gray-900",
              variant === "secondary" && "text-secondary-foreground",
              "group-hover:animate-pulse"
            )}
          />
        )}

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
              variant === "secondary" && "text-secondary-foreground",
              "group-hover:animate-pulse"
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
        !children && "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
      )}>
      {IconLeft && (
        <IconLeft
          className={cn(
            "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            className,
            !children &&
              "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300  w-6 h-6",
            big && "w-10 h-10",
            variant === "outline" && "text-gray-900",
            variant === "secondary" && "text-secondary-foreground",
            "group-hover:animate-pulse"
          )}
        />
      )}

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
            variant === "secondary" && "text-secondary-foreground",
            "group-hover:animate-pulse"
          )}
        />
      )}
    </ShadButton>
  );
};
