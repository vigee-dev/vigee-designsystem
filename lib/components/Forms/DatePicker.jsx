"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var form_1 = require("../ui/form");
var moment_1 = __importDefault(require("moment"));
var popover_1 = require("../ui/popover");
var utils_1 = require("../../lib/utils");
var button_1 = require("../ui/button");
var calendar_1 = require("../ui/calendar");
var locale_1 = require("date-fns/locale");
var input_1 = require("../ui/input");
var PikaIcons_1 = require("../../icons/PikaIcons");
function DatePicker(_a) {
    var label = _a.label, form = _a.form, name = _a.name, className = _a.className, starting_date = _a.starting_date, disabled = _a.disabled, disabledKeys = _a.disabledKeys, returnString = _a.returnString, defaultValue = _a.defaultValue;
    var yearDefault = defaultValue
        ? (0, moment_1.default)(defaultValue).year().toString()
        : (0, moment_1.default)().year().toString();
    var dateDefault = defaultValue
        ? (0, moment_1.default)(defaultValue).toDate()
        : form && name
            ? form.getValues(name)
            : new Date();
    var inputDate = defaultValue
        ? (0, moment_1.default)(defaultValue).format("DD/MM/YYYY")
        : "";
    var _b = (0, react_1.useState)(yearDefault), selectedYear = _b[0], setSelectedYear = _b[1];
    var _c = (0, react_1.useState)(dateDefault), selectedDate = _c[0], setSelectedDate = _c[1];
    var _d = (0, react_1.useState)(inputDate), inputValue = _d[0], setInputValue = _d[1];
    var _e = (0, react_1.useState)(false), popoverOpen = _e[0], setPopoverOpen = _e[1];
    function convertDateToString(date) {
        console.log(date, "date", typeof date);
        if (typeof date === "string") {
            return (0, moment_1.default)(date).format("DD/MM/YYYY");
        }
        return date.toLocaleDateString();
    }
    var formatInputDate = function (value) {
        // Supprime tout caractère non numérique
        var numbers = value.replace(/\D/g, "");
        // Insère les '/' après le jour et le mois si la longueur de la chaîne le permet
        var formattedValue = numbers;
        if (numbers.length > 2) {
            formattedValue = numbers.substring(0, 2) + "/" + numbers.substring(2);
        }
        if (numbers.length > 4) {
            formattedValue =
                formattedValue.substring(0, 5) + "/" + formattedValue.substring(5);
        }
        // Limite la longueur de la chaîne à 10 caractères pour correspondre au format DD/MM/YYYY
        return formattedValue.substring(0, 10);
    };
    var handleInputChange = function (e) {
        var formattedInputValue = formatInputDate(e.target.value);
        setInputValue(formattedInputValue);
        // Tente de convertir la chaîne formatée en un objet Date, si valide
        var date = (0, moment_1.default)(formattedInputValue, "DD/MM/YYYY", true);
        if (date.isValid()) {
            setSelectedDate(date.toDate());
            return date.toDate();
        }
        else {
            setSelectedDate(null);
            return null;
        }
    };
    (0, react_1.useEffect)(function () {
        if (selectedDate) {
            setInputValue((0, moment_1.default)(selectedDate).format("DD/MM/YYYY"));
        }
    }, [selectedDate]);
    return (<form_1.FormField control={form.control} name={name} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className="flex flex-col py-2">
          <form_1.FormLabel className="font-black text-primary">{label}</form_1.FormLabel>
          <popover_1.Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <popover_1.PopoverTrigger asChild>
              <form_1.FormControl>
                {!disabledKeys ? (<input_1.Input value={field.value
                        ? convertDateToString(field.value)
                        : inputValue} onChange={function (e) {
                        var date = handleInputChange(e);
                        if (date) {
                            field.onChange(returnString
                                ? (0, moment_1.default)(date).format("YYYY-MM-DD")
                                : date);
                        }
                        else {
                            // Gérer le cas où la date n'est pas valide / ou réinitialiser le champ
                            field.onChange(null);
                        }
                    }} placeholder="Choisir une date" className={(0, utils_1.cn)("pl-3 text-left font-display font-medium bg-input border-none", !field.value && "text-muted-foreground", className)} type="text" disabled={disabled}/>) : (<button_1.Button disabled={disabled} variant={"outline"} className={(0, utils_1.cn)("pl-3 text-left font-display font-medium bg-input border-none", !field.value && "text-muted-foreground", className)}>
                    {field.value ? ((0, moment_1.default)(field.value).format("DD/MM/YYYY")) : (<span>Choisir une date</span>)}

                    <PikaIcons_1.PiCalendarFilledContrast className="ml-auto h-4 w-4 opacity-50"/>
                  </button_1.Button>)}
              </form_1.FormControl>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-auto p-0" align="start">
              <calendar_1.Calendar key={selectedYear} mode="single" selected={selectedDate !== null && selectedDate !== void 0 ? selectedDate : undefined} onSelect={function (date) {
                    setSelectedDate(date !== null && date !== void 0 ? date : null);
                    setPopoverOpen(false); // Ferme le Popover après la sélection d'une date
                    field.onChange(returnString ? (0, moment_1.default)(date).format("YYYY-MM-DD") : date);
                }} disabled={function (date) {
                    return starting_date ? date < starting_date : false;
                }} locale={locale_1.fr} initialFocus defaultMonth={selectedDate || new Date()}/>
            </popover_1.PopoverContent>
          </popover_1.Popover>
          <form_1.FormDescription></form_1.FormDescription>
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>);
}
exports.default = DatePicker;
