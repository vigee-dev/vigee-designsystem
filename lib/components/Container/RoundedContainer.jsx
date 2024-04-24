"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundedContainer = void 0;
var react_1 = __importDefault(require("react"));
function RoundedContainer(_a) {
    var children = _a.children;
    return (<div className="bg-white rounded-md shadow-sm p-8 max-w-7xl justify-center mx-auto">
      {children}
    </div>);
}
exports.RoundedContainer = RoundedContainer;
