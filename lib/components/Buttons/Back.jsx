"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var outline_1 = require("@heroicons/react/24/outline");
var Button_1 = require("./Button");
var Back = function (_a) {
    var href = _a.href, where = _a.where, onClick = _a.onClick;
    return (<div className="flex flex-grid text-gray-400 ">
      {href ? (<link_1.default href={href} className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold">
          <outline_1.ArrowLeftIcon width={15}/>
          <p className="mx-1 text-sm "> {where}</p>
        </link_1.default>) : (<Button_1.Button variant="ghost" onClick={onClick} className="flex flex-grid text-gray-400 pb-1 hover:text-primary transform ease-in-out duration-200 hover:font-bold border-0">
          <outline_1.ArrowLeftIcon width={15}/>
          <p className="mx-1 text-sm "> {where}</p>
        </Button_1.Button>)}
    </div>);
};
exports.default = Back;
