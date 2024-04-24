"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
var textarea_1 = require("../ui/textarea");
var react_1 = require("react");
var form_1 = require("../ui/form");
var PikaIcons_1 = require("../../icons/PikaIcons");
var hover_card_1 = require("../ui/hover-card");
var utils_1 = require("../../lib/utils");
function TextArea(_a) {
    var form = _a.form, id = _a.id, name = _a.name, required = _a.required, label = _a.label, placeholder = _a.placeholder, count = _a.count, max = _a.max, _b = _a.minHeight, minHeight = _b === void 0 ? "32" : _b, defaultValue = _a.defaultValue, onBlur = _a.onBlur, onChange = _a.onChange, className = _a.className, descr = _a.descr, disabled = _a.disabled, helpComponent = _a.helpComponent;
    var _c = (0, react_1.useState)(0), charCount = _c[0], setCharCount = _c[1]; // État local pour le compteur de caractères
    return (<form_1.FormField control={form === null || form === void 0 ? void 0 : form.control} name={name} rules={{ required: required }} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem>
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
          <textarea_1.Textarea {...field} placeholder={placeholder !== null && placeholder !== void 0 ? placeholder : ""} onBlur={onBlur} onChange={function (e) {
                    if (count) {
                        setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
                    }
                    field.onChange(e);
                }} className={(0, utils_1.cn)("resize-none font-medium bg-input border-none text-[16px] md:text-sm col-span-full", className)} disabled={disabled}/>
          {descr && <form_1.FormDescription>{descr}</form_1.FormDescription>}
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>);
}
exports.default = TextArea;
