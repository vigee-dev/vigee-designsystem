"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var link_1 = __importDefault(require("next/link"));
var Copyright = function (_a) {
    var _b = _a.clientName, clientName = _b === void 0 ? "Vigee" : _b;
    return (<div className=" bottom-1 justify-center mx-auto max-w-sm text-center mb-2">
      <p className="text-sm text-gray-500  md:block p-0 md:p-5 bottom-1 left-0 mt-4">
        Copyright &copy; {new Date().getFullYear()}{" "}
        {"".concat(clientName, ". Tous droits r\u00E9serv\u00E9s. Developed by ")}{" "}
        <link_1.default href="https://www.vigee.fr" className="text-black font-bold">
          Vigee
        </link_1.default>
      </p>
    </div>);
};
exports.default = Copyright;
