"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var form_1 = require("../ui/form");
var switch_1 = require("../ui/switch");
var utils_1 = require("../../lib/utils");
function Switch(_a) {
    var form = _a.form, label = _a.label, name = _a.name, descr = _a.descr, className = _a.className, onChange = _a.onChange, value = _a.value;
    return (form === null || form === void 0 ? void 0 : form.control) && name ? (<form_1.FormField control={form.control} name={name} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className={(0, utils_1.cn)("flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white", className)}>
          <div className="space-y-0.5">
            <form_1.FormLabel className="text-base ">{label}</form_1.FormLabel>
            <form_1.FormDescription>{descr}</form_1.FormDescription>
          </div>
          <form_1.FormControl>
            <switch_1.Switch checked={field.value} onCheckedChange={field.onChange}/>
          </form_1.FormControl>
        </form_1.FormItem>);
        }}/>) : (<form_1.FormItem className={(0, utils_1.cn)("flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white", className)}>
      <div className="space-y-0.5">
        <form_1.FormLabel className="text-base ">{label}</form_1.FormLabel>
        <form_1.FormDescription>{descr}</form_1.FormDescription>
      </div>
      <form_1.FormControl>
        <switch_1.Switch checked={value} onCheckedChange={onChange}/>
      </form_1.FormControl>
    </form_1.FormItem>);
}
exports.default = Switch;
