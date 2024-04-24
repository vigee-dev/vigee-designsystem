"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var form_1 = require("../ui/form");
var moment_1 = __importDefault(require("moment"));
var popover_1 = require("../ui/popover");
var button_1 = require("../ui/button");
var utils_1 = require("../../lib/utils");
var react_icons_1 = require("@radix-ui/react-icons");
var calendar_1 = require("../ui/calendar");
var locale_1 = require("date-fns/locale");
function DatePicker(_a) {
    var label = _a.label, form = _a.form, name = _a.name, className = _a.className, starting_date = _a.starting_date, disabled = _a.disabled;
    return (<form_1.FormField control={form.control} name={name} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className="flex flex-col py-2">
          <form_1.FormLabel className="font-black text-primary">{label}</form_1.FormLabel>
          <popover_1.Popover>
            <popover_1.PopoverTrigger asChild>
              <form_1.FormControl>
                <button_1.Button disabled={disabled} variant={"outline"} className={(0, utils_1.cn)("pl-3 text-left font-display font-medium bg-input border-none  ".concat(className), !field.value && "text-muted-foreground")}>
                  {field.value ? ((0, moment_1.default)(field.value).format("DD/MM/YYYY")) : (<span>Choisir une date</span>)}

                  <react_icons_1.CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                </button_1.Button>
              </form_1.FormControl>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-auto p-0" align="start">
              <calendar_1.Calendar mode="single" selected={field.value} onSelect={function (date) {
                    var formatted_date = (0, moment_1.default)(date).format("YYYY-MM-DD");
                    field.onChange(formatted_date);
                }} disabled={function (date) {
                    if (starting_date) {
                        return date < starting_date;
                    }
                    return false;
                }} locale={locale_1.fr} initialFocus/>
            </popover_1.PopoverContent>
          </popover_1.Popover>
          <form_1.FormDescription></form_1.FormDescription>
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>);
}
exports.default = DatePicker;
