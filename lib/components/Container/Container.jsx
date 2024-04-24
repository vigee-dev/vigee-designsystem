"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../lib/utils");
function Container(_a) {
    var children = _a.children, className = _a.className;
    return (<div className={(0, utils_1.cn)("bg-white flex flex-col border rounded-xl  justify-center  my-4 w-full", className)}>
      {children}
    </div>);
}
exports.Container = Container;
