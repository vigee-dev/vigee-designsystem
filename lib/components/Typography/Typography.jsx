"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypographyBlockquote = exports.TypographyH4 = exports.TypographyH3 = exports.TypographyH2 = exports.TypographyH1 = void 0;
var react_1 = __importDefault(require("react"));
var utils_1 = require("../../lib/utils");
function TypographyH1(_a) {
    var children = _a.children, className = _a.className;
    return (<h1 className={"flex items-center scroll-m-20 text-2xl font-bold tracking-tight lg:text-2xl my-1 ".concat(className)}>
      {children}
    </h1>);
}
exports.TypographyH1 = TypographyH1;
function TypographyH2(_a) {
    var children = _a.children, className = _a.className;
    return (<h2 className={(0, utils_1.cn)("scroll-m-20  pb-2 text-xl  tracking-tight first:mt-0", className)}>
      {children}
    </h2>);
}
exports.TypographyH2 = TypographyH2;
function TypographyH3(_a) {
    var children = _a.children, className = _a.className;
    return (<h3 className={"scroll-m-20 text-lg  tracking-tight ".concat(className)}>
      {children}
    </h3>);
}
exports.TypographyH3 = TypographyH3;
function TypographyH4(_a) {
    var children = _a.children, className = _a.className;
    return (<h4 className={"scroll-m-20 text-md  tracking-tight ".concat(className)}>
      {children}
    </h4>);
}
exports.TypographyH4 = TypographyH4;
function TypographyBlockquote(_a) {
    var children = _a.children;
    return (<blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>);
}
exports.TypographyBlockquote = TypographyBlockquote;
