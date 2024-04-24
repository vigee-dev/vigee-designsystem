"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineContainer = void 0;
var link_1 = __importDefault(require("next/link"));
var Typography_1 = require("../Typography/Typography");
var PikaIcons_1 = require("../../icons/PikaIcons");
var utils_1 = require("../../lib/utils");
var Content = function (_a) {
    var title = _a.title, icon = _a.icon, children = _a.children, className = _a.className;
    return (<div className={(0, utils_1.cn)("rounded-xl h-fit p-5 my-4 items-center border border-slate-200 hover:bg-slate-50 transition-ease-in-out duration-100 hover:cursor-pointer bg-white ", className)}>
    <div className="flex flex-wrap justify-between gap-x-4 w-full items-center">
      <div className="flex gap-x-4">
        {icon && <div className="icon-container text-gray-400">{icon}</div>}
        <Typography_1.TypographyH4>{title}</Typography_1.TypographyH4>
      </div>
      <div className="flex gap-x-4">
        <div className="rounded-md p-1 ">
          {children ? (children) : (<PikaIcons_1.PiChevronBigRightStroke className="text-gray-400 hover:text-primary transform ease-in-out duration-300"/>)}
        </div>
      </div>
    </div>
  </div>);
};
function LineContainer(_a) {
    var title = _a.title, children = _a.children, background = _a.background, icon = _a.icon, href = _a.href, onClick = _a.onClick, className = _a.className;
    // Si href est présent, utilisez Link pour la navigation
    if (href) {
        return (<link_1.default href={href} passHref>
        <Content title={title} icon={icon} background={background} className={className}/>
      </link_1.default>);
    }
    // Sinon, appliquez l'événement onClick directement
    return (<div onClick={onClick}>
      <Content title={title} icon={icon} background={background}>
        {children}
      </Content>
    </div>);
}
exports.LineContainer = LineContainer;
