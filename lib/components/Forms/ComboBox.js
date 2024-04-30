"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { FormLabel } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";
export function ComboBox(_a) {
  var _b;
  var items = _a.items,
    form = _a.form,
    name = _a.name,
    label = _a.label,
    _c = _a.placeholder,
    placeholder = _c === void 0 ? "Sélectionnez..." : _c,
    _d = _a.required,
    required = _d === void 0 ? true : _d,
    icon = _a.icon,
    onChange = _a.onChange;
  var value;
  if (form) {
    var _e = form || {},
      control = _e.control,
      setValue = _e.setValue,
      watch = _e.watch;
    value = watch(name);
  }
  var _f = React.useState(false),
    open = _f[0],
    setOpen = _f[1];
  // Fonction de filtrage personnalisée
  var filterItems = function (label, search) {
    if (label === void 0) {
      label = "";
    }
    if (search === void 0) {
      search = "";
    }
    // Votre logique de filtrage ici, retournez 1 pour un match, 0 sinon.
    // Par exemple, filtrer sur le label des items
    if (label.toLowerCase().includes(search.toLowerCase())) return 1;
    return 0;
  };
  return _jsxs(Popover, {
    open: open,
    onOpenChange: setOpen,
    children: [
      label &&
        _jsx(FormLabel, {
          className: "font-black text-primary pb-2",
          children: label,
        }),
      _jsx(PopoverTrigger, {
        asChild: true,
        children: _jsxs(Button, {
          variant: "outline",
          role: "combobox",
          "aria-expanded": open,
          className: "w-full flex gap-x-2 bg-input border-0 justify-between",
          children: [
            _jsxs("div", {
              className: "flex gap-x-2 items-center",
              children: [
                icon && icon,
                value
                  ? (_b = items.find(function (item) {
                      return item.value === value;
                    })) === null || _b === void 0
                    ? void 0
                    : _b.label
                  : placeholder,
              ],
            }),
            _jsx(ChevronsUpDown, {
              className: "ml-2 h-4 w-4 shrink-0 opacity-50",
            }),
          ],
        }),
      }),
      _jsx(PopoverContent, {
        className: "w-full p-0",
        children: _jsxs(Command, {
          filter: filterItems,
          children: [
            _jsx(CommandInput, { placeholder: "Rechercher..." }),
            _jsx(CommandEmpty, {
              children: "Aucun \u00E9l\u00E9ment trouv\u00E9.",
            }),
            _jsx(CommandGroup, {
              className: "max-h-[200px]",
              children: _jsx(ScrollArea, {
                className: "h-[200px]",
                children: items.map(function (item) {
                  return _jsxs(
                    CommandItem,
                    {
                      className: "max-h-[200px]",
                      value: item.value,
                      onSelect: function (currentValue) {
                        var valueToUpdate =
                          currentValue === value ? undefined : currentValue;
                        if (form) {
                          form.setValue(name, valueToUpdate);
                        }
                        setOpen(false);
                      },
                      children: [
                        _jsx(Check, {
                          className: cn(
                            "mr-2 h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          ),
                        }),
                        item.label,
                      ],
                    },
                    item.value
                  );
                }),
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
