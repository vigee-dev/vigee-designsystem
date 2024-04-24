"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var collapsible_1 = require("../../components/ui/collapsible");
var react_1 = __importStar(require("react"));
var Collapsible = function (_a) {
    var trigger = _a.trigger, children = _a.children, className = _a.className, _b = _a.defaultOpen, defaultOpen = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(defaultOpen), isOpen = _c[0], setIsOpen = _c[1];
    return (<collapsible_1.Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <collapsible_1.CollapsibleTrigger asChild>
        <div>{trigger}</div>
      </collapsible_1.CollapsibleTrigger>
      <collapsible_1.CollapsibleContent className="space-y-2">{children}</collapsible_1.CollapsibleContent>
    </collapsible_1.Collapsible>);
};
exports.default = Collapsible;
