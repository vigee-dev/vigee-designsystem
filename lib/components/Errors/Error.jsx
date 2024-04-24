"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
var image_1 = __importDefault(require("next/image"));
var react_1 = __importDefault(require("react"));
var error_svg_1 = __importDefault(require("../../img/error/error.svg"));
var link_1 = __importDefault(require("next/link"));
var PikaIcons_1 = require("../../icons/PikaIcons");
var Button_1 = require("../Buttons/Button");
function Error(_a) {
    var title = _a.title, subtitle = _a.subtitle, children = _a.children, supportEmail = _a.supportEmail, onClick = _a.onClick;
    return (<div className="flex flex-col items-center justify-center  w-full px-12 ">
      {error_svg_1.default && (<image_1.default width={400} height={400} className="mx-auto w-44 h-auto" src={error_svg_1.default} alt="Erreur"/>)}
      <h1 className={"text-xl text-primary font-bold text-center pt-6 font-display"}>
        {title ? title : "Une erreur s'est produite."}
      </h1>

      {subtitle && <p className="text-gray-400">{subtitle}</p>}

      {supportEmail && (<link_1.default className="text-sm text-gray-500  items-center text-center font-display" href={supportEmail ? "mailto:".concat(supportEmail) : "/"}>
          <Button_1.Button variant="outline" className=" flex gap-x-2">
            Contacter le support <PikaIcons_1.PiEnvelopeArrowRightDuoSolid />
          </Button_1.Button>
        </link_1.default>)}

      {children}

      {onClick && <Button_1.Button onClick={onClick} className="py-2">
        Rééssayer
      </Button_1.Button>}
    </div>);
}
exports.Error = Error;
