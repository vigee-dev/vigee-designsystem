"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var VigeeGrayLogo_png_1 = __importDefault(require("../../img/logos/VigeeGrayLogo.png"));
var image_1 = __importDefault(require("next/image"));
function VariableLogo(_a) {
    var title = _a.title, big = _a.big;
    return (<div className="flex items-center gap-x-1">
      <image_1.default src={VigeeGrayLogo_png_1.default} alt="Vigee" width={big ? 40 : 30} height={big ? 40 : 30} className="md:flex mb-1"/>
      <p className={"font-display font-black text-black ".concat(big ? "text-4xl" : "text-2xl")}>
        {title}
      </p>
    </div>);
}
exports.default = VariableLogo;
