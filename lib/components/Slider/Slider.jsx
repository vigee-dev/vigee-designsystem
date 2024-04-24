"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
var utils_1 = require("../../lib/utils");
var slider_1 = require("../../components/ui/slider");
var Typography_1 = require("../Typography/Typography");
function Slider(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className="flex flex-col  w-full">
      <div className="flex justify-between  gap-x-2 ">
        <p className="text-gray-400 text-md">{props.title}</p>
        <Typography_1.TypographyH2 className="text-primary font-bold ">
          {props.value}%
        </Typography_1.TypographyH2>
      </div>

      <div className="flex gap-x-2 w-full">
        <p className="text-gray-400">{props.min}</p>
        <slider_1.Slider defaultValue={props.defaultValue} max={props.max} step={props.step} className={(0, utils_1.cn)("w-full text-gray-400 ", className)} {...props}/>
        <p className="text-gray-400">{props.max}</p>
      </div>
    </div>);
}
exports.Slider = Slider;
