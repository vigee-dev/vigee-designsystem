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
exports.ComboBoxResponsive = void 0;
var React = __importStar(require("react"));
var button_1 = require("../../components/ui/button");
var command_1 = require("../../components/ui/command");
var drawer_1 = require("../../components/ui/drawer");
var popover_1 = require("../../components/ui/popover");
var label_1 = require("../ui/label");
function ComboBoxResponsive(_a) {
    var label = _a.label, items = _a.items, text = _a.text, selectedStatus = _a.selectedStatus, setSelectedStatus = _a.setSelectedStatus;
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    return (<>
        <div className="hidden md:block">
          <popover_1.Popover open={open} onOpenChange={setOpen}>
            <label_1.Label className="font-bold text-primary">{label}</label_1.Label>
            <popover_1.PopoverTrigger asChild>
              <button_1.Button variant="outline" className="w-[150px] justify-start">
                {selectedStatus ? <>{selectedStatus.label}</> : <>{text}</>}
              </button_1.Button>
            </popover_1.PopoverTrigger>
            <popover_1.PopoverContent className="w-[200px] p-0" align="start">
              <StatusList statuses={items} setOpen={setOpen} setSelectedStatus={setSelectedStatus}/>
            </popover_1.PopoverContent>
          </popover_1.Popover>
        </div>

        <div className="md:hidden">
          <drawer_1.Drawer open={open} onOpenChange={setOpen}>
            <label_1.Label className="font-bold text-primary">{label}</label_1.Label>
            <drawer_1.DrawerTrigger asChild>
              <button_1.Button variant="outline" className="w-[150px] justify-start">
                {selectedStatus ? <>{selectedStatus.label}</> : <>{text}</>}
              </button_1.Button>
            </drawer_1.DrawerTrigger>
            <drawer_1.DrawerContent>
              <div className="mt-4 border-t">
                <StatusList statuses={items} setOpen={setOpen} setSelectedStatus={setSelectedStatus}/>
              </div>
            </drawer_1.DrawerContent>
          </drawer_1.Drawer>
        </div>
      </>);
}
exports.ComboBoxResponsive = ComboBoxResponsive;
function StatusList(_a) {
    var statuses = _a.statuses, setOpen = _a.setOpen, setSelectedStatus = _a.setSelectedStatus;
    return (<command_1.Command>
        <command_1.CommandInput placeholder="Rechercher..."/>
        <command_1.CommandList>
          <command_1.CommandEmpty>Aucun résultat.</command_1.CommandEmpty>
          <command_1.CommandGroup>
            {statuses.map(function (status) { return (<command_1.CommandItem key={status.value} value={status.value} onSelect={function (value) {
                setSelectedStatus(statuses.find(function (priority) { return priority.value === value; }) || null);
                setOpen(false);
            }}>
                  {status.label}
                </command_1.CommandItem>); })}
          </command_1.CommandGroup>
        </command_1.CommandList>
      </command_1.Command>);
}
