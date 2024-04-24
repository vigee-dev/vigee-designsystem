"use strict";
"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var locale_1 = require("date-fns/locale");
var utils_1 = require("../../lib/utils");
var button_1 = require("../ui/button");
var calendar_1 = require("../ui/calendar");
var popover_1 = require("../ui/popover");
var select_1 = require("../ui/select");
var date_fns_1 = require("date-fns");
var react_popover_1 = require("@radix-ui/react-popover");
var label_1 = require("../ui/label");
var PikaIcons_1 = require("../../icons/PikaIcons");
var DatePickerRange = function (_a) {
    var className = _a.className, date = _a.date, setDate = _a.setDate, select = _a.select, label = _a.label, onChange = _a.onChange, disabledDays = _a.disabledDays;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var newDate;
    var handleSelectChange = function (value) {
        var lastYear = new Date().getFullYear() - 1;
        switch (value) {
            case "thisWeek":
                newDate = {
                    from: (0, date_fns_1.startOfWeek)(new Date(), { weekStartsOn: 1 }),
                    to: (0, date_fns_1.endOfWeek)(new Date(), { weekStartsOn: 1 }),
                };
                break;
            case "thisMonth":
                newDate = {
                    from: (0, date_fns_1.startOfMonth)(new Date()),
                    to: (0, date_fns_1.endOfMonth)(new Date()),
                };
                break;
            case "thisYear":
                newDate = { from: (0, date_fns_1.startOfYear)(new Date()), to: (0, date_fns_1.endOfYear)(new Date()) };
                break;
            case "lastYear":
                newDate = {
                    from: (0, date_fns_1.startOfYear)(new Date(new Date().getFullYear() - 1, 0, 1)), // Début de l'année dernière
                    to: (0, date_fns_1.endOfYear)(new Date(new Date().getFullYear() - 1, 11, 31)), // Fin de l'année dernière
                };
                break;
            case "allTime":
                newDate = {
                    from: undefined,
                    to: undefined,
                };
                break;
            default:
                return; // S'assurer que la fonction s'arrête si aucune correspondance n'est trouvée
        }
        setDate(newDate); // Met à jour l'état avec la nouvelle plage de dates
        if (onChange && newDate) {
            onChange(newDate); // Appelle onChange avec la nouvelle valeur directement
        }
        setIsOpen(false); // Ferme le Popover
    };
    return (<div className={(0, utils_1.cn)("grid gap-2", className)}>
      <popover_1.Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col gap-y-1 w-full">
          {label && <label_1.Label className="font-bold text-primary">{label}</label_1.Label>}
          <popover_1.PopoverTrigger asChild>
            <button_1.Button id="date" variant={"outline"} className={(0, utils_1.cn)("justify-start text-left font-normal w-full bg-input border-0", !date && "text-muted-foreground", className)}>
              <PikaIcons_1.PiCalendarCheckDuoSolid className="mr-2 h-4 w-4 text-primary-light"/>
              {(date === null || date === void 0 ? void 0 : date.from) ? (date.to ? (<>
                    {(0, date_fns_1.format)(date.from, "dd LLL y", { locale: locale_1.fr })} -{" "}
                    {(0, date_fns_1.format)(date.to, "dd LLL y", { locale: locale_1.fr })}
                  </>) : ((0, date_fns_1.format)(date.from, "LLL dd, y", { locale: locale_1.fr }))) : (<span>Choisir une période</span>)}
            </button_1.Button>
          </popover_1.PopoverTrigger>
          <popover_1.PopoverContent className="w-auto p-0" align="end">
            <div className="flex flex-col p-2">
              <react_popover_1.PopoverClose>
                {select && (<select_1.Select onValueChange={handleSelectChange}>
                    <select_1.SelectTrigger>
                      <select_1.SelectValue placeholder="Choisir une période"/>
                    </select_1.SelectTrigger>
                    <select_1.SelectContent position="popper">
                      <select_1.SelectItem value="thisWeek">Cette semaine</select_1.SelectItem>
                      <select_1.SelectItem value="thisMonth">Ce mois-ci</select_1.SelectItem>
                      <select_1.SelectItem value="thisYear">Cette année</select_1.SelectItem>
                      <select_1.SelectItem value="lastYear">
                        {"L'année dernière"}
                      </select_1.SelectItem>
                      <select_1.SelectItem value="allTime">Depuis le début</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>)}
              </react_popover_1.PopoverClose>

              <calendar_1.Calendar disabled={disabledDays} initialFocus mode="range" defaultMonth={date === null || date === void 0 ? void 0 : date.from} selected={date} onSelect={setDate} numberOfMonths={2} locale={locale_1.fr}/>
            </div>
          </popover_1.PopoverContent>
        </div>
      </popover_1.Popover>
    </div>);
};
exports.default = DatePickerRange;
