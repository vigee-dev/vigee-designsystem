import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { Button as ShadButton } from "../ui/button";
import { cn } from "../lib/utils";
import { PiSendPlaneHorizontalContrast, PiEye02OnContrast, PiPlusSquareDuoSolid, PiDownloadDownDuoSolid, PiDeleteDustbin01DuoStroke, PiUploadUpDuoSolid, PiArrowLeftStroke, PiPencilEditBoxDuoSolid, PiArrowLeftCircleContrast, PiUserPlusContrast, PiCopyCopiedDuoSolid, } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";
import { Loader2 } from "lucide-react";
var iconMap = {
    send: PiSendPlaneHorizontalContrast,
    view: PiEye02OnContrast,
    add: PiPlusSquareDuoSolid,
    download: PiDownloadDownDuoSolid,
    trash: PiDeleteDustbin01DuoStroke,
    upload: PiUploadUpDuoSolid,
    back: PiArrowLeftStroke,
    edit: PiPencilEditBoxDuoSolid,
    arrowLeft: PiArrowLeftCircleContrast,
    user: PiUserPlusContrast,
    copy: PiCopyCopiedDuoSolid,
};
var Button = function Button(_a) {
    var children = _a.children, onClick = _a.onClick, variant = _a.variant, _b = _a.type, type = _b === void 0 ? "button" : _b, disabled = _a.disabled, href = _a.href, className = _a.className, pending = _a.pending, icon = _a.icon, iconComponent = _a.iconComponent, tooltip = _a.tooltip, big = _a.big;
    return pending ? (_jsxs(ButtonComponent, { disabled: true, variant: variant, className: className, children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin " }), children] })) : href ? (_jsx(Link, { href: href, children: _jsx(ButtonComponent, { variant: variant, icon: icon, iconComponent: iconComponent, className: className, onClick: onClick, type: type, disabled: disabled, tooltip: tooltip, big: big, children: children }) })) : (_jsx(ButtonComponent, { variant: variant, icon: icon, iconComponent: iconComponent, className: className, onClick: onClick, type: type, disabled: disabled, tooltip: tooltip, big: big, children: children }));
};
var ButtonComponent = function (_a) {
    var children = _a.children, onClick = _a.onClick, variant = _a.variant, type = _a.type, disabled = _a.disabled, className = _a.className, icon = _a.icon, iconComponent = _a.iconComponent, tooltip = _a.tooltip, big = _a.big;
    var Icon = icon ? iconMap[icon] : null;
    return tooltip ? (_jsx(Tooltip, { message: tooltip !== null && tooltip !== void 0 ? tooltip : "", children: _jsxs(ShadButton, { variant: variant, onClick: onClick, type: type, disabled: disabled, className: cn("group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2", className, !children &&
                "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "), children: [children, iconComponent, Icon && (_jsx(Icon, { className: cn("text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5", className, !children &&
                        "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7", big && "w-10 h-10", variant === "outline" && "text-gray-900", variant === "secondary" && "text-secondary-foreground") }))] }) })) : (_jsxs(ShadButton, { variant: variant, onClick: onClick, type: type, disabled: disabled, className: cn("group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2 ", className, !children &&
            "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent "), children: [children, iconComponent, Icon && (_jsx(Icon, { className: cn("text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5", className, !children &&
                    "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7", big && "w-10 h-10", variant === "outline" && "text-gray-900", variant === "secondary" && "text-secondary-foreground") }))] }));
};
export { Button };
