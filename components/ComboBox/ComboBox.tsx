"use client";
import React, { useState } from "react";
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

  // Filtrer les items basés sur le texte de recherche
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  console.log(filteredItems);

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
              ? items.find((item) => item.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Rechercher..."
              onValueChange={(e) => setSearchText(e.toString())} // Utiliser onValueChange pour mettre à jour searchText
            />
            <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map(
                (
                  item // Utiliser filteredItems ici
                ) => (
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
                )
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}
