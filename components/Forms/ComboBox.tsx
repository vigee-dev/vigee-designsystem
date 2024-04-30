"use client";

import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
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
import { cn } from "../lib/utils";
import { Label } from "../ui/label";
import { FormLabel } from "../ui/form";
import { ScrollArea } from "../ui/scroll-area";

interface Item {
  value: string;
  label: string;
}

type ComboBoxProps<T extends z.ZodType<any, any>> = {
  form?: UseFormReturn<z.infer<T> & FieldValues>;
  name: Path<z.infer<T> & FieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  items: Item[];
  icon?: React.ReactNode;
  onChange: (value: string | undefined) => void;
};

export function ComboBox<T extends z.ZodType<any, any, any>>({
  items,
  form,
  name,
  label,
  placeholder = "Sélectionnez...",
  required = true,
  icon,
  onChange,
}: ComboBoxProps<T>) {
  let value: string | undefined;

  if (form) {
    const { control, setValue, watch } = form || {};
    value = watch(name);
  }
  const [open, setOpen] = React.useState(false);

  // Fonction de filtrage personnalisée
  const filterItems = (label = "", search = "") => {
    // Votre logique de filtrage ici, retournez 1 pour un match, 0 sinon.
    // Par exemple, filtrer sur le label des items
    if (label.toLowerCase().includes(search.toLowerCase())) return 1;
    return 0;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <FormLabel className="font-black text-primary pb-2">{label}</FormLabel>
      )}

      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full flex gap-x-2 bg-input border-0 justify-between"
        >
          <div className="flex gap-x-2 items-center">
            {icon && icon}
            {value
              ? items.find(item => item.value === value)?.label
              : placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command filter={filterItems}>
          <CommandInput placeholder="Rechercher..." />
          <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
          <CommandGroup className="max-h-[200px]">
            <ScrollArea className="h-[200px]">
              {items.map(item => (
                <CommandItem
                  className="max-h-[200px]"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue: string) => {
                    const valueToUpdate =
                      currentValue === value ? undefined : currentValue;

                    if (form) {
                      form.setValue(
                        name as Path<z.infer<T> & FieldValues>,
                        valueToUpdate as any
                      );
                    }

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
