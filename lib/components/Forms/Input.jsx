"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var form_1 = require("../ui/form");
var input_1 = require("../ui/input");
var PikaIcons_1 = require("../../icons/PikaIcons");
var hover_card_1 = require("../ui/hover-card");
var label_1 = require("../../components/ui/label");
var utils_1 = require("../../lib/utils");
function Input(_a) {
    var form = _a.form, label = _a.label, placeholder = _a.placeholder, _b = _a.type, type = _b === void 0 ? "text" : _b, _c = _a.required, required = _c === void 0 ? true : _c, name = _a.name, descr = _a.descr, className = _a.className, disabled = _a.disabled, id = _a.id, min = _a.min, max = _a.max, step = _a.step, helpComponent = _a.helpComponent, onChange = _a.onChange, value = _a.value;
    return form && name ? (<form_1.FormField control={form === null || form === void 0 ? void 0 : form.control} name={name} rules={{ required: required }} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className={className}>
          <hover_card_1.HoverCard>
            <div className="flex items-center justify-between ">
              {label && (<form_1.FormLabel className="font-black text-primary mt-2">
                  {label}
                </form_1.FormLabel>)}
              {helpComponent && (<hover_card_1.HoverCardTrigger>
                  <PikaIcons_1.PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400"/>
                </hover_card_1.HoverCardTrigger>)}
            </div>

            {helpComponent && (<hover_card_1.HoverCardContent>
                <div className="p-2">{helpComponent}</div>
              </hover_card_1.HoverCardContent>)}

            <form_1.FormControl>
              <input_1.Input placeholder={placeholder} {...field} type={type} disabled={disabled} id={id} min={min} max={max} step={step} className="text-[16px] md:text-sm font-medium bg-input border-none"/>
            </form_1.FormControl>
          </hover_card_1.HoverCard>
          {descr && <form_1.FormDescription>{descr}</form_1.FormDescription>}
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>) : (<div className={(0, utils_1.cn)("space-y-2", className)}>
      <hover_card_1.HoverCard>
        <div className="flex items-center justify-between py-1">
          {label && <label_1.Label className="font-black text-primary">{label}</label_1.Label>}
          {helpComponent && (<hover_card_1.HoverCardTrigger>
              <PikaIcons_1.PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400"/>
            </hover_card_1.HoverCardTrigger>)}
        </div>

        {helpComponent && (<hover_card_1.HoverCardContent>
            <div className="p-2">{helpComponent}</div>
          </hover_card_1.HoverCardContent>)}

        <input_1.Input placeholder={placeholder} type={type} disabled={disabled} id={id} min={min} max={max} step={step} onChange={onChange} value={value} className="text-[16px] md:text-sm font-medium bg-input border-none"/>
      </hover_card_1.HoverCard>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>);
}
exports.default = Input;
