"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var image_1 = __importDefault(require("next/image"));
var vigee_png_1 = __importDefault(require("../../img/logos/vigee.png"));
var react_1 = __importDefault(require("react"));
var ByVigee = function (_a) {
    var dark = _a.dark;
    return dark ? (<span className="text-slate-400 flex pt-8">
      <link_1.default href="https://www.vigee.fr" target="_blank" className="text-slate-400 flex">
        Developed by{" "}
        <image_1.default src={vigee_png_1.default} width={70} height={20} alt="Vigee" className="pt-1 ml-2 "/>
      </link_1.default>
    </span>) : (<span className="text-primary flex">
      <link_1.default href="https://www.vigee.fr" target="_blank" className="text-primary flex">
        Developed by{" "}
        <image_1.default src={vigee_png_1.default} width={70} height={20} alt="Vigee" className="pt-1 ml-2 "/>
      </link_1.default>
    </span>);
};
exports.default = ByVigee;
