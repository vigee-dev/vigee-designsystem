"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = __importDefault(require("next/image"));
var react_1 = __importDefault(require("react"));
function Illustration(_a) {
    var title = _a.title, title2 = _a.title2, subtitle = _a.subtitle, img = _a.img, children = _a.children, _b = _a.width, width = _b === void 0 ? 500 : _b, _c = _a.height, height = _c === void 0 ? 500 : _c;
    return (<div className="flex flex-col items-center justify-center bg-primary h-screen w-full px-12 ">
      {img && (<image_1.default width={width} height={height} className={"mx-auto"} src={img} alt="LoginForm image"/>)}
      <h1 className={"text-5xl text-gray-300 font-black text-center pt-6 font-display"}>
        {title} <span className="text-white">{title2}</span>
      </h1>
      {subtitle && (<p className="text-xl text-slate-500   text-center font-display">
          {" "}
          {subtitle}{" "}
        </p>)}

      {children}
    </div>);
}
exports.default = Illustration;
