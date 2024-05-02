/// <reference types="react" />
import { PiSendPlaneHorizontalContrast, PiEye02OnContrast, PiPlusSquareDuoSolid, PiDownloadDownDuoSolid, PiDeleteDustbin01DuoStroke, PiUploadUpDuoSolid, PiArrowLeftStroke, PiPencilEditBoxDuoSolid, PiArrowLeftCircleContrast, PiUserPlusContrast, PiCopyCopiedDuoSolid } from "../../icons/PikaIcons";
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
    iconComponent?: React.ReactNode;
    tooltip?: string;
    big?: boolean;
}
declare const iconMap: {
    send: typeof PiSendPlaneHorizontalContrast;
    view: typeof PiEye02OnContrast;
    add: typeof PiPlusSquareDuoSolid;
    download: typeof PiDownloadDownDuoSolid;
    trash: typeof PiDeleteDustbin01DuoStroke;
    upload: typeof PiUploadUpDuoSolid;
    back: typeof PiArrowLeftStroke;
    edit: typeof PiPencilEditBoxDuoSolid;
    arrowLeft: typeof PiArrowLeftCircleContrast;
    user: typeof PiUserPlusContrast;
    copy: typeof PiCopyCopiedDuoSolid;
};
declare const Button: ({ children, onClick, variant, type, disabled, href, className, pending, icon, iconComponent, tooltip, big, }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export { Button };
