import React, { useMemo } from "react";
import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { cn } from "../../lib/utils";
import {
  PiSendPlaneHorizontalContrast,
  PiEye02OnContrast,
  PiPlusSquareDuoSolid,
  PiDownloadDownDuoSolid,
  PiDeleteDustbin01DuoStroke,
  PiUploadUpDuoSolid,
  PiArrowLeftStroke,
  PiPencilEditBoxDuoSolid, PiArrowLeftCircleContrast, PiUserPlusContrast,
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
  iconComponent?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  big?: boolean;
}

const iconMap = {
  send: PiSendPlaneHorizontalContrast,
  view: PiEye02OnContrast,
  add: PiPlusSquareDuoSolid,
  download: PiDownloadDownDuoSolid,
  trash: PiDeleteDustbin01DuoStroke,
  upload: PiUploadUpDuoSolid,
  back: PiArrowLeftStroke,
  edit: PiPencilEditBoxDuoSolid,
  arrowLeft: PiArrowLeftCircleContrast,
  user: PiUserPlusContrast

};

export const Button = React.memo<ButtonProps>(
  ({
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
  }) => {
    return pending ? (
      <ButtonComponent disabled variant={variant} className={className}>
        <Loader2 className={`mr-2 h-4 w-4 animate-spin `} />
        {children}
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
);

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
  iconComponent?: React.ComponentType<{ className?: string }>;
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
  const Icon = iconComponent || (icon ? iconMap[icon] : null);

  return tooltip ? (
    <Tooltip message={tooltip ?? ""}>
      <ShadButton
        variant={variant}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={cn(
          "group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2",
          className,
          !children &&
            "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
        )}
      >
        {children}
        {Icon && (
          <Icon
            className={cn(
              "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
              className,
              !children &&
                "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7",
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
        "group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2 ",
        className,
        !children &&
          "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "
      )}
    >
      {children}
      {Icon && (
        <Icon
          className={cn(
            "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            !children &&
              "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7",
            big && "w-10 h-10",
            variant === "outline" && "text-gray-900",
            variant === "secondary" && "text-secondary-foreground"
          )}
        />
      )}
    </ShadButton>
  );
};

Button.displayName = "Button";
