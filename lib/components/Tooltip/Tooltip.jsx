"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
var react_1 = __importDefault(require("react"));
var tooltip_1 = require("../ui/tooltip");
function Tooltip(_a) {
    var message = _a.message, children = _a.children;
    return (<div className="relative">
      <tooltip_1.TooltipProvider>
        <tooltip_1.Tooltip>
          <tooltip_1.TooltipTrigger asChild>{children}</tooltip_1.TooltipTrigger>
          <tooltip_1.TooltipContent>
            <p>{message}</p>
          </tooltip_1.TooltipContent>
        </tooltip_1.Tooltip>
      </tooltip_1.TooltipProvider>
    </div>);
}
exports.Tooltip = Tooltip;
