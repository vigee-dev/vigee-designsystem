"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeader = void 0;
var react_1 = __importDefault(require("react"));
var Typography_1 = require("../Typography/Typography");
var utils_1 = require("../../lib/utils");
function PageHeader(_a) {
    var title = _a.title, children = _a.children, small = _a.small, icon = _a.icon, className = _a.className;
    return (<div className={(0, utils_1.cn)("rounded-xl h-fit bg-white p-5  border items-center mb-4", className)}>
      <div className="flex flex-wrap justify-between  gap-x-4 w-full items-center ">
        <div className="flex items-center gap-4 ">
          {icon}
          {small ? (<Typography_1.TypographyH2 className="text-primary">{title}</Typography_1.TypographyH2>) : (<Typography_1.TypographyH1 className="text-primary">{title}</Typography_1.TypographyH1>)}
        </div>
        <div className="flex gap-x-4">{children}</div>
      </div>
    </div>);
}
exports.PageHeader = PageHeader;
