"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var react_1 = __importDefault(require("react"));
var link_1 = __importDefault(require("next/link"));
var Button_1 = require("../Buttons/Button");
var Container_1 = require("../Container/Container");
var empty_man_svg_1 = __importDefault(require("../../img/empty/empty-man.svg"));
function EmptyIllustration(_a) {
    var text = _a.text, subtitle = _a.subtitle, buttonLink = _a.buttonLink, buttonText = _a.buttonText, children = _a.children;
    return (<Container_1.Container className="flex flex-col items-center justify-center  w-full px-12 p-8">
      <image_1.default width={400} height={400} className="mx-auto w-64 h-auto" src={empty_man_svg_1.default} alt="Empty list"/>

      <h1 className={"text-xl text-gray-500 font-bold text-center pt-6 font-display"}>{text}</h1>

      <p className="text-gray-400">{subtitle}</p>

      {buttonLink && (<link_1.default className="text-sm text-gray-500  items-center text-center font-display pt-2" href={"".concat(buttonLink)}>
          {buttonText ? (<Button_1.Button className="flex gap-x-2">{buttonText}</Button_1.Button>) : (<Button_1.Button icon="add" big/>)}
        </link_1.default>)}

      {children}
    </Container_1.Container>);
}
exports.default = EmptyIllustration;
