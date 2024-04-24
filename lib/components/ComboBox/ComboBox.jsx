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
exports.ComboBox = void 0;
var react_1 = __importStar(require("react"));
var button_1 = require("../../components/ui/button");
var command_1 = require("../../components/ui/command");
var popover_1 = require("../../components/ui/popover");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("../../lib/utils");
var label_1 = require("../ui/label");
var scroll_area_1 = require("../ui/scroll-area");
function ComboBox(_a) {
    var _b;
    var items = _a.items, value = _a.value, onChange = _a.onChange, label = _a.label, _c = _a.placeholder, placeholder = _c === void 0 ? "Sélectionnez..." : _c, icon = _a.icon;
    var _d = (0, react_1.useState)(false), open = _d[0], setOpen = _d[1];
    var _e = (0, react_1.useState)(""), searchText = _e[0], setSearchText = _e[1];
    // Fonction de filtrage personnalisée
    var filterItems = function (value, search) {
        if (value === void 0) { value = ""; }
        if (search === void 0) { search = ""; }
        // Votre logique de filtrage ici, retournez 1 pour un match, 0 sinon.
        // Par exemple, filtrer sur le label des items
        if (value.toLowerCase().includes(search.toLowerCase()))
            return 1;
        return 0;
    };
    return (<popover_1.Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col w-full">
        <label_1.Label className="font-bold text-primary-light">{label}</label_1.Label>

        <popover_1.PopoverTrigger asChild>
          <button_1.Button variant="outline" role="combobox" aria-expanded={open} className="w-full flex gap-x-2 bg-input border-0 justify-between">
            <div className="flex gap-x-2 items-center text-gray-800">
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
            <command_1.CommandInput placeholder="Rechercher..." autoFocus/>
            <command_1.CommandEmpty>Aucun élément trouvé.</command_1.CommandEmpty>
            <command_1.CommandGroup className="max-h-[200px]">
              <scroll_area_1.ScrollArea className="h-[200px]">
                {items.map(function (item) {
            return (<command_1.CommandItem key={item.value} value={item.label} onSelect={function () {
                    onChange(item.value === value ? undefined : item.value);
                    setOpen(false);
                }}>
                      <lucide_react_1.Check className={(0, utils_1.cn)("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")}/>
                      {item.label}
                    </command_1.CommandItem>);
        })}
              </scroll_area_1.ScrollArea>
            </command_1.CommandGroup>
          </command_1.Command>
        </popover_1.PopoverContent>
      </div>
    </popover_1.Popover>);
}
exports.ComboBox = ComboBox;
