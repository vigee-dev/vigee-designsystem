/**
 * @description Bouton polyvalent Vigee avec icônes Pika intégrées, états pending/disabled, navigation href et tooltip optionnel.
 * @useWhen action iconique sans libellé dans une interface (ex: éditer, supprimer, télécharger) → `icon` seul | navigation vers une page → `href` | état de chargement async → `pending={true}` | action avec label uniquement pour validation finale → `children` + `type="submit"`
 * @dontUseFor validation de formulaire avec logique de confirmation → utiliser ActionWithValidation | ajout d'entité dédié → utiliser ButtonAdd | soumission de formulaire stylisée → utiliser ButtonSubmit
 * @example <Button icon="edit" onClick={handleEdit} tooltip="Modifier" />
 */
import { Loader2, XIcon } from "lucide-react";
import Link from "next/link";
import {
  PiAnnotationStarStroke,
  PiAppleLogoStroke,
  PiArrowLeftCircleStroke,
  PiArrowLeftStroke,
  PiBarchartDefaultStroke,
  PiCalendarFilledStroke,
  PiCalendarPlusStroke,
  PiCameraStroke,
  PiChatDefaultStroke,
  PiChatPlusStroke,
  PiCheckTickSingleStroke,
  PiChevronDownStroke,
  PiClockDefaultStroke,
  PiChevronLeftStroke,
  PiChevronRightStroke,
  PiChevronUpStroke,
  PiContactsBookStroke,
  PiCopyCopiedStroke,
  PiDeleteDustbin01Stroke,
  PiDownloadDownStroke,
  PiEye02OnStroke,
  PiFacebookStroke,
  PiFilePlusStroke,
  PiFilterLinesStroke,
  PiGithubStroke,
  PiGoogleStroke,
  PiHomeDefaultStroke,
  PiHourglassStroke,
  PiInstagramStroke,
  PiLinkHorizontalStroke,
  PiListPlusStroke,
  PiListSearchStroke,
  PiLogOutRightStroke,
  PiNavigationSlantStroke,
  PiOpenaiStroke,
  PiPauseCircleStroke,
  PiPencilEditBoxStroke,
  PiPhoneDefaultStroke,
  PiPlayCircleStroke,
  PiPlusCircleStroke,
  PiPlusDefaultStroke,
  PiPlusSquareStroke,
  PiRefreshStroke,
  PiRepeatSquareStroke,
  PiRotateLeftStroke,
  PiSearchDefaultStroke,
  PiSendPlaneHorizontalStroke,
  PiThreeDotsMenuHorizontalStroke,
  PiThumbReactionLikeStroke,
  PiUploadUpStroke,
  PiUserCircleStroke,
  PiUserPlusStroke,
  PiUserSettingsStroke,
  PiSettings02Stroke,
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
  send: PiSendPlaneHorizontalStroke,
  view: PiEye02OnStroke,
  add: PiPlusSquareStroke,
  download: PiDownloadDownStroke,
  trash: PiDeleteDustbin01Stroke,
  upload: PiUploadUpStroke,
  fileAdd: PiFilePlusStroke,
  annotationStar: PiAnnotationStarStroke,
  back: PiArrowLeftStroke,
  edit: PiPencilEditBoxStroke,
  arrowLeft: PiArrowLeftCircleStroke,
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
  logout: PiLogOutRightStroke,
  navigation: PiNavigationSlantStroke,
  chevronDown: PiChevronDownStroke,
  chevronUp: PiChevronUpStroke,
  github: PiGithubStroke,
  google: PiGoogleStroke,
  apple: PiAppleLogoStroke,
  dots: PiThreeDotsMenuHorizontalStroke,
  check: PiCheckTickSingleStroke,
  clock: PiClockDefaultStroke,
  phone: PiPhoneDefaultStroke,
  ai: PiOpenaiStroke,
  settings: PiUserSettingsStroke,
  stats: PiBarchartDefaultStroke,
  hourglass: PiHourglassStroke,
  list: PiListPlusStroke,
  seeMore: PiListSearchStroke,
  cancel: PiRotateLeftStroke,
  cross: XIcon,
  home: PiHomeDefaultStroke,
  contacts: PiContactsBookStroke,
  chat: PiChatDefaultStroke,
  play: PiPlayCircleStroke,
  pause: PiPauseCircleStroke,
  link: PiLinkHorizontalStroke,
  thumbsUp: PiThumbReactionLikeStroke,
  chatAdd: PiChatPlusStroke,
  rdvAdd: PiCalendarPlusStroke,
  plusCircle: PiPlusCircleStroke,
  repeat: PiRepeatSquareStroke,
  instagram: PiInstagramStroke,
  facebook: PiFacebookStroke,
  configuration: PiSettings02Stroke,
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
            ? cn(
                "hover:cursor-pointer",
                // group-hover:text-primary uniquement pour les boutons icon-only
                // (sinon le texte des boutons avec children passe en bleu foncé
                // sur fond bleu foncé au survol → invisible)
                !children && "group-hover:text-primary",
              )
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
          ? cn(
              "hover:cursor-pointer",
              // group-hover:text-primary uniquement pour les boutons icon-only
              // (sinon le texte des boutons avec children passe en bleu foncé
              // sur fond bleu foncé au survol → invisible)
              !children && "group-hover:text-primary",
            )
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
