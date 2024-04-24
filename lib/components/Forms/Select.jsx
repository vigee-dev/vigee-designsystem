"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var select_1 = require("../ui/select");
var PikaIcons_1 = require("../../icons/PikaIcons");
var hover_card_1 = require("../ui/hover-card");
var form_1 = require("../ui/form");
var label_1 = require("../../components/ui/label");
function Select(_a) {
    var form = _a.form, label = _a.label, placeholder = _a.placeholder, _b = _a.required, required = _b === void 0 ? true : _b, name = _a.name, descr = _a.descr, children = _a.children, className = _a.className, disabled = _a.disabled, onChange = _a.onChange, value = _a.value, helpComponent = _a.helpComponent, _c = _a.isBoolean, isBoolean = _c === void 0 ? false : _c;
    return (form === null || form === void 0 ? void 0 : form.control) && name ? (<form_1.FormField control={form.control} name={name} rules={{ required: required }} render={function (_a) {
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
          </hover_card_1.HoverCard>
          <select_1.Select onValueChange={function (e) {
                    if (!isBoolean) {
                        field.onChange(e);
                    }
                    else {
                        var eBoolean = e === "true";
                        field.onChange(eBoolean);
                    }
                }} value={String(field.value)} disabled={disabled}>
            <form_1.FormControl>
              <select_1.SelectTrigger className="font-medium bg-input border-none">
                <select_1.SelectValue placeholder={placeholder}/>
              </select_1.SelectTrigger>
            </form_1.FormControl>
            <select_1.SelectContent className="max-h-[200px] font-medium">
              {children}
            </select_1.SelectContent>
          </select_1.Select>
          {descr && <form_1.FormDescription>{descr}</form_1.FormDescription>}
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>) : (<div className={className}>
      {label && <label_1.Label className="font-black text-primary">{label}</label_1.Label>}
      <select_1.Select onValueChange={onChange} value={String(value)} disabled={disabled}>
        <select_1.SelectTrigger className="font-medium bg-input border-none">
          <select_1.SelectValue placeholder={placeholder}/>
        </select_1.SelectTrigger>
        <select_1.SelectContent className="max-h-[200px] font-medium">
          {children}
        </select_1.SelectContent>
      </select_1.Select>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>);
}
exports.default = Select;
