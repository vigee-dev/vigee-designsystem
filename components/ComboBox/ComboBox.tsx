"use client";
import React, { useState, useEffect } from "react";
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
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

interface Item {
  value: string;
  label: string;
}

interface ComboBoxProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  items: Item[];
  icon?: React.ReactNode;
}

export function ComboBox({
  items,
  value,
  onChange,
  label,
  placeholder = "Sélectionnez...",
  icon,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col w-full">
        <Label className="font-bold text-primary-light">{label}</Label>

        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-input border-0 gap-x-2 items-center"
          >
            {icon && icon}
            {value
              ? filteredItems.find(item => item.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Rechercher..."
              value={searchText} // Ajoutez cette ligne pour contrôler la valeur
              onValueChange={e => setSearchText(e)} // Mettez à jour searchText basé sur l'entrée de l'utilisateur
            />
            <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
            <CommandGroup className="max-h-[200px]">
              <ScrollArea className="h-[200px]">
                {filteredItems?.map(item => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      onChange(item.value === value ? undefined : item.value);
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
      </div>
    </Popover>
  );
}
