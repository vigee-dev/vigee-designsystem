"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBox = void 0;
var react_1 = __importDefault(require("react"));
var button_1 = require("../../components/ui/button");
var command_1 = require("../../components/ui/command");
var popover_1 = require("../../components/ui/popover");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../lib/utils");
var form_1 = require("../ui/form");
var scroll_area_1 = require("../ui/scroll-area");
function ComboBox(_a) {
    var _b;
    var items = _a.items, form = _a.form, name = _a.name, label = _a.label, _c = _a.placeholder, placeholder = _c === void 0 ? "Sélectionnez..." : _c, _d = _a.required, required = _d === void 0 ? true : _d, icon = _a.icon, onChange = _a.onChange;
    var value;
    if (form) {
        var _e = form || {}, control = _e.control, setValue = _e.setValue, watch = _e.watch;
        value = watch(name);
    }
    var _f = react_1.default.useState(false), open = _f[0], setOpen = _f[1];
    // Fonction de filtrage personnalisée
    var filterItems = function (label, search) {
        if (label === void 0) { label = ""; }
        if (search === void 0) { search = ""; }
        // Votre logique de filtrage ici, retournez 1 pour un match, 0 sinon.
        // Par exemple, filtrer sur le label des items
        if (label.toLowerCase().includes(search.toLowerCase()))
            return 1;
        return 0;
    };
    return (<popover_1.Popover open={open} onOpenChange={setOpen}>
      {label && (<form_1.FormLabel className="font-black text-primary pb-2">{label}</form_1.FormLabel>)}

      <popover_1.PopoverTrigger asChild>
        <button_1.Button variant="outline" role="combobox" aria-expanded={open} className="w-full flex gap-x-2 bg-input border-0 justify-between">
          <div className="flex gap-x-2 items-center">
            {icon && icon}
            {value
            ? (_b = items.find(function (item) { return item.value === value; })) === null || _b === void 0 ? void 0 : _b.label
            : placeholder}
          </div>
          <lucide_react_1.ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </button_1.Button>
      </popover_1.PopoverTrigger>
      <popover_1.PopoverContent className="w-full p-0">
        <command_1.Command filter={filterItems}>
          <command_1.CommandInput placeholder="Rechercher..."/>
          <command_1.CommandEmpty>Aucun élément trouvé.</command_1.CommandEmpty>
          <command_1.CommandGroup className="max-h-[200px]">
            <scroll_area_1.ScrollArea className="h-[200px]">
              {items.map(function (item) { return (<command_1.CommandItem className="max-h-[200px]" key={item.value} value={item.value} onSelect={function (currentValue) {
                var valueToUpdate = currentValue === value ? undefined : currentValue;
                if (form) {
                    form.setValue(name, valueToUpdate);
                }
                setOpen(false);
            }}>
                  <lucide_react_1.Check className={(0, utils_1.cn)("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")}/>
                  {item.label}
                </command_1.CommandItem>); })}
            </scroll_area_1.ScrollArea>
          </command_1.CommandGroup>
        </command_1.Command>
      </popover_1.PopoverContent>
    </popover_1.Popover>);
}
exports.ComboBox = ComboBox;
