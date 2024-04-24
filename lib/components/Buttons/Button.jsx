"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var react_1 = __importDefault(require("react"));
var link_1 = __importDefault(require("next/link"));
var button_1 = require("../ui/button");
var utils_1 = require("../../lib/utils");
var PikaIcons_1 = require("../../icons/PikaIcons");
var Tooltip_1 = require("../Tooltip/Tooltip");
var lucide_react_1 = require("lucide-react");
var iconMap = {
    send: PikaIcons_1.PiSendPlaneHorizontalContrast,
    view: PikaIcons_1.PiEye02OnContrast,
    add: PikaIcons_1.PiPlusSquareDuoSolid,
    download: PikaIcons_1.PiDownloadDownDuoSolid,
    trash: PikaIcons_1.PiDeleteDustbin01DuoStroke,
    upload: PikaIcons_1.PiUploadUpDuoSolid,
    back: PikaIcons_1.PiArrowLeftStroke,
    edit: PikaIcons_1.PiPencilEditBoxDuoSolid,
    arrowLeft: PikaIcons_1.PiArrowLeftCircleContrast,
    user: PikaIcons_1.PiUserPlusContrast,
};
var Button = function Button(_a) {
    var children = _a.children, onClick = _a.onClick, variant = _a.variant, _b = _a.type, type = _b === void 0 ? "button" : _b, disabled = _a.disabled, href = _a.href, className = _a.className, pending = _a.pending, icon = _a.icon, iconComponent = _a.iconComponent, tooltip = _a.tooltip, big = _a.big;
    return pending ? (<ButtonComponent disabled variant={variant} className={className}>
      <lucide_react_1.Loader2 className={"mr-2 h-4 w-4 animate-spin "}/>
      {children}
    </ButtonComponent>) : href ? (<link_1.default href={href}>
      <ButtonComponent variant={variant} icon={icon} iconComponent={iconComponent} className={className} onClick={onClick} type={type} disabled={disabled} tooltip={tooltip} big={big}>
        {children}
      </ButtonComponent>
    </link_1.default>) : (<ButtonComponent variant={variant} icon={icon} iconComponent={iconComponent} className={className} onClick={onClick} type={type} disabled={disabled} tooltip={tooltip} big={big}>
      {children}
    </ButtonComponent>);
};
exports.Button = Button;
var ButtonComponent = function (_a) {
    var children = _a.children, onClick = _a.onClick, variant = _a.variant, type = _a.type, disabled = _a.disabled, className = _a.className, icon = _a.icon, iconComponent = _a.iconComponent, tooltip = _a.tooltip, big = _a.big;
    var Icon = iconComponent || (icon ? iconMap[icon] : null);
    return tooltip ? (<Tooltip_1.Tooltip message={tooltip !== null && tooltip !== void 0 ? tooltip : ""}>
      <button_1.Button variant={variant} onClick={onClick} type={type} disabled={disabled} className={(0, utils_1.cn)("group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2", className, !children &&
            "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent ")}>
        {children}
        {Icon && (<Icon className={(0, utils_1.cn)("text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5", className, !children &&
                "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7", big && "w-10 h-10", variant === "outline" && "text-gray-900", variant === "secondary" && "text-secondary-foreground")}/>)}
      </button_1.Button>
    </Tooltip_1.Tooltip>) : (<button_1.Button variant={variant} onClick={onClick} type={type} disabled={disabled} className={(0, utils_1.cn)("group group-hover:text-primary  group-hover:cursor-pointer font-bold text-sm border flex gap-2 ", className, !children &&
            "bg-transparent border-none group-hover:bg-transparent hover:bg-transparent ")}>
      {children}
      {Icon && (<Icon className={(0, utils_1.cn)("text-gray-100 transform transition-ease-in-out duration-300 ease-in-out w-5 h-5", !children &&
                "group-hover:text-primary text-gray-400 group-hover:cursor-pointer hover:text-primary hover:cursor-pointer group-hover:scale-105 transform transition-ease-in-out duration-300 w-7 h-7", big && "w-10 h-10", variant === "outline" && "text-gray-900", variant === "secondary" && "text-secondary-foreground")}/>)}
    </button_1.Button>);
};
