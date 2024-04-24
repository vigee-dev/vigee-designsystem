"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderPage = void 0;
var react_1 = __importDefault(require("react"));
var VigeeGrayLogo_png_1 = __importDefault(require("../../img/logos/VigeeGrayLogo.png"));
var image_1 = __importDefault(require("next/image"));
var LoaderPage = function (_a) {
    var text = _a.text, logo = _a.logo, borderColor = _a.borderColor;
    return (<div className="flex flex-col justify-center items-center gap-y-2 p-12 h-screen">
      <div className="relative flex items-center justify-center">
        <div className={"absolute h-28 w-28 border-2 ".concat(borderColor ? borderColor : "border-gray-300", " rounded-full animate-spin border-t-transparent")}/>

        <image_1.default src={logo ? logo : VigeeGrayLogo_png_1.default} alt="logo" width={50} height={40} className="animate-pulse"/>
      </div>
      <p className="text-primary-foreground text-sm">{text}</p>
    </div>);
};
exports.LoaderPage = LoaderPage;
