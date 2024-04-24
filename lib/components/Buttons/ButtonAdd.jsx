"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Typography_1 = require("../Typography/Typography");
var utils_1 = require("../../lib/utils");
var link_1 = __importDefault(require("next/link"));
var ButtonAdd = function (_a) {
    var text = _a.text, icon = _a.icon, _b = _a.type, type = _b === void 0 ? "button" : _b, className = _a.className, onClick = _a.onClick, href = _a.href;
    return href ? (<link_1.default href={href}>
      <button type={type} className={(0, utils_1.cn)("flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer ", className)}>
        {icon}
        <Typography_1.TypographyH2 className="text-md">{text}</Typography_1.TypographyH2>
      </button>
    </link_1.default>) : (<button type={type} className={(0, utils_1.cn)("flex flex-col text-gray-400 items-center pt-2 hover:text-primary transform ease-in-out duration-200 cursor-pointer ", className)} onClick={onClick}>
      {icon}
      <Typography_1.TypographyH2 className="text-md">{text}</Typography_1.TypographyH2>
    </button>);
};
exports.default = ButtonAdd;
