import React, { useMemo } from "react";
import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { LoadingButton } from "./LoadingButton";
import { cn } from "../../lib/utils";
import {
  PiSendPlaneHorizontalContrast,
  PiEye02OnContrast,
  PiPlusSquareDuoSolid,
  PiDownloadDownDuoSolid,
  PiDeleteDustbin01DuoStroke,
  PiUploadUpDuoSolid,
  PiArrowLeftStroke,
} from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";
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
}

const iconMap = {
  send: PiSendPlaneHorizontalContrast,
  view: PiEye02OnContrast,
  add: PiPlusSquareDuoSolid,
  download: PiDownloadDownDuoSolid,
  trash: PiDeleteDustbin01DuoStroke,
  upload: PiUploadUpDuoSolid,
  back: PiArrowLeftStroke,
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
  }) => {
    return pending ? (
      <LoadingButton
        variant={variant}
        className={cn("font-bold text-sm border", className)}
      >
        {children}
      </LoadingButton>
    ) : href ? (
      <Link href={href}>
        <ButtonComponent
          variant={variant}
          icon={icon}
          className={className}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </ButtonComponent>
      </Link>
    ) : tooltip ? (
      <Tooltip message={tooltip ?? ""}>
        <ButtonComponent
          variant={variant}
          icon={icon}
          className={className}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {children}
        </ButtonComponent>
      </Tooltip>
    ) : (
      <ButtonComponent />
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
}: ButtonComponentProps) => {
  const Icon = iconComponent || (icon ? iconMap[icon] : null);

  return (
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
              "group-hover:text-primary text-gray-500 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform ease-in-out duration-300 w-7 h-7"
          )}
        />
      )}
    </ShadButton>
  );
};
