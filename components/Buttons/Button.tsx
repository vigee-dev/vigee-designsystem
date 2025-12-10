import { Loader2, XIcon } from "lucide-react";
import Link from "next/link";
import {
  PiAppleLogoStroke,
  PiArrowLeftCircleContrast,
  PiArrowLeftStroke,
  PiBarchartDefaultStroke,
  PiCalendarFilledStroke,
  PiCalendarPlusStroke,
  PiCameraStroke,
  PiChatDefaultStroke,
  PiChatPlusStroke,
  PiCheckTickSingleStroke,
  PiChevronDownStroke,
  PiChevronLeftStroke,
  PiChevronRightStroke,
  PiChevronUpStroke,
  PiContactsBookStroke,
  PiCopyCopiedStroke,
  PiDeleteDustbin01DuoSolid,
  PiDownloadDownDuoSolid,
  PiEye02OnContrast,
  PiFacebookStroke,
  PiFilterLinesStroke,
  PiGithubStroke,
  PiGoogleStroke,
  PiHomeDefaultStroke,
  PiInstagramStroke,
  PiLinkHorizontalStroke,
  PiListPlusStroke,
  PiListSearchDuoSolid,
  PiLogOutRightDuoStroke,
  PiNavigationSlantStroke,
  PiOpenaiStroke,
  PiPauseCircleDuoSolid,
  PiPencilEditBoxDuoStroke,
  PiPhoneDefaultStroke,
  PiPlayCircleDuoSolid,
  PiPlusCircleStroke,
  PiPlusDefaultStroke,
  PiPlusSquareDuoSolid,
  PiRefreshStroke,
  PiRepeatSquareStroke,
  PiRotateLeftStroke,
  PiSearchDefaultStroke,
  PiSendPlaneHorizontalContrast,
  PiThreeDotsMenuHorizontalStroke,
  PiThumbReactionLikeStroke,
  PiUploadUpDuoSolid,
  PiUserCircleStroke,
  PiUserPlusStroke,
  PiUserSettingsStroke,
} from "../../icons/PikaIcons";
import { cn } from "../lib/utils";
import { Tooltip } from "../Tooltip/Tooltip";
import {
  Button as ShadButton,
  ButtonProps as ShadButtonProps,
} from "../ui/button";

export interface ButtonProps extends ShadButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPointerDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  iconLeft?: keyof typeof iconMap;
  iconComponent?: React.ReactNode;
  tooltip?: string;
  big?: boolean;
  classNameIcon?: string;
  "data-testid"?: string;
}

const iconMap = {
  send: PiSendPlaneHorizontalContrast,
  view: PiEye02OnContrast,
  add: PiPlusSquareDuoSolid,
  download: PiDownloadDownDuoSolid,
  trash: PiDeleteDustbin01DuoSolid,
  upload: PiUploadUpDuoSolid,
  back: PiArrowLeftStroke,
  edit: PiPencilEditBoxDuoStroke,
  arrowLeft: PiArrowLeftCircleContrast,
  userAdd: PiUserPlusStroke,
  user: PiUserCircleStroke,
  copy: PiCopyCopiedStroke,
  chevron: PiChevronRightStroke,
  chevronLeft: PiChevronLeftStroke,
  search: PiSearchDefaultStroke,
  plus: PiPlusDefaultStroke,
  camera: PiCameraStroke,
  filter: PiFilterLinesStroke,
  calendar: PiCalendarFilledStroke,
  refresh: PiRefreshStroke,
  logout: PiLogOutRightDuoStroke,
  navigation: PiNavigationSlantStroke,
  chevronDown: PiChevronDownStroke,
  chevronUp: PiChevronUpStroke,
  github: PiGithubStroke,
  google: PiGoogleStroke,
  apple: PiAppleLogoStroke,
  dots: PiThreeDotsMenuHorizontalStroke,
  check: PiCheckTickSingleStroke,
  phone: PiPhoneDefaultStroke,
  ai: PiOpenaiStroke,
  settings: PiUserSettingsStroke,
  stats: PiBarchartDefaultStroke,
  list: PiListPlusStroke,
  seeMore: PiListSearchDuoSolid,
  cancel: PiRotateLeftStroke,
  cross: XIcon,
  home: PiHomeDefaultStroke,
  contacts: PiContactsBookStroke,
  chat: PiChatDefaultStroke,
  play: PiPlayCircleDuoSolid,
  pause: PiPauseCircleDuoSolid,
  link: PiLinkHorizontalStroke,
  thumbsUp: PiThumbReactionLikeStroke,
  chatAdd: PiChatPlusStroke,
  rdvAdd: PiCalendarPlusStroke,
  plusCircle: PiPlusCircleStroke,
  repeat: PiRepeatSquareStroke,
  instagram: PiInstagramStroke,
  facebook: PiFacebookStroke,
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
  iconLeft,
  iconComponent,
  tooltip,
  big,
  classNameIcon,
  "data-testid": dataTestId,
  ...props
}: ButtonProps) {
  return pending ? (
    <ShadButton
      disabled
      variant={variant}
      className={cn(
        className,
        children
          ? "rounded-xl font-bold text-sm flex px-3 gap-4"
          : "bg-transparent text-gray-800"
      )}
      data-testid={dataTestId}
    >
      {children}
      <Loader2
        className={cn(`h-4 w-4 animate-spin `, children ? "mr-2" : "mr-0 ")}
      />
    </ShadButton>
  ) : href ? (
    <Link href={href}>
      <ButtonComponent
        variant={variant}
        icon={icon}
        iconLeft={iconLeft}
        iconComponent={iconComponent}
        className={className}
        classNameIcon={classNameIcon}
        onClick={onClick}
        type={type}
        disabled={disabled}
        tooltip={tooltip}
        big={big}
        data-testid={dataTestId}
        {...props}
      >
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
      classNameIcon={classNameIcon}
      onClick={onClick}
      type={type}
      disabled={disabled}
      tooltip={tooltip}
      big={big}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
}

interface ButtonComponentProps extends ShadButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
  iconLeft?: keyof typeof iconMap;
  iconComponent?: React.ReactNode;
  tooltip?: string;
  big?: boolean;
  classNameIcon?: string;
  pending?: boolean;
  "data-testid"?: string;
}

const ButtonComponent = ({
  children,
  onClick,
  variant,
  type,
  disabled,
  className,
  icon,
  iconLeft,
  iconComponent,
  tooltip,
  big,
  classNameIcon,
  pending,
  "data-testid": dataTestId,
  ...props
}: ButtonComponentProps) => {
  const Icon = icon ? iconMap[icon] : null;
  const IconLeft = iconLeft ? iconMap[iconLeft] : null;

  return tooltip ? (
    <Tooltip message={tooltip ?? ""}>
      <ShadButton
        {...props}
        variant={variant}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={cn(
          "group rounded-xl font-bold text-sm flex px-3 gap-4 ",
          className,
          !children && "bg-transparent border-none hover:bg-transparent",
          !disabled
            ? "hover:cursor-pointer group-hover:text-primary"
            : "hover:cursor-not-allowed ",
          pending && children && "bg-transparent text-gray-800"
        )}
        data-testid={dataTestId}
      >
        {IconLeft && (
          <IconLeft
            className={cn(
              "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
              !children &&
                "text-slate-400 transform transition-ease-in-out duration-300 w-6 h-6",
              big && "w-10 h-10",
              variant === "outline" && "text-gray-900",
              variant === "secondary" && "text-secondary-foreground",
              !disabled && "md:group-hover:animate-pulse",
              !children &&
                !disabled &&
                "group-hover:text-primary group-hover:scale-105",
              "bg-transparent",
              classNameIcon
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
                "text-slate-400 transform transition-ease-in-out duration-300 w-6 h-6",
              big && "w-10 h-10",
              variant === "outline" && "text-gray-900",
              variant === "secondary" && "text-secondary-foreground",
              !disabled && "md:group-hover:animate-pulse",
              !children &&
                !disabled &&
                "group-hover:text-primary group-hover:scale-105",
              "bg-transparent",
              classNameIcon
            )}
          />
        )}
      </ShadButton>
    </Tooltip>
  ) : (
    <ShadButton
      {...props}
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "group rounded-xl font-bold text-sm flex gap-4",
        className,
        !children &&
          "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent",
        !disabled
          ? "hover:cursor-pointer group-hover:text-primary"
          : "hover:cursor-not-allowed",
        pending && children && "bg-transparent text-gray-800"
      )}
      data-testid={dataTestId}
    >
      {IconLeft && (
        <IconLeft
          className={cn(
            "text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5",
            !children &&
              "text-slate-400 transform transition-ease-in-out duration-300 w-6 h-6",
            big && "w-10 h-10",
            variant === "outline" && "text-gray-900",
            variant === "secondary" && "text-secondary-foreground",
            !disabled && "md:group-hover:animate-pulse",
            !children &&
              !disabled &&
              "group-hover:text-primary group-hover:scale-105",
            className,
            "bg-transparent",
            classNameIcon
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
              "text-slate-400 transform transition-ease-in-out duration-300 w-6 h-6",
            big && "w-10 h-10",
            variant === "outline" && "text-gray-900",
            variant === "secondary" && "text-secondary-foreground",
            !disabled && "md:group-hover:animate-pulse",
            !children &&
              !disabled &&
              "group-hover:text-primary group-hover:scale-105",
            "bg-transparent",
            classNameIcon
          )}
        />
      )}
    </ShadButton>
  );
};
