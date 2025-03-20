"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useQueryState } from "nuqs";
import { Select } from "../Select/Select";
import { PiChevronSortVerticalStroke } from "../../icons/PikaIcons";

export const Filter = ({
  queryKey,
  options,
  placeholder,
  defaultValue,
  searchable,
}: {
  queryKey: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: string;
  searchable?: boolean;
}) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });
  const [open, setOpen] = React.useState(false);

  const handleChange = (value: string | undefined) => {
    setValue(value || null);
  };

  const filterItems = (item: { label: string; value: string }, search: string) => {
    return item.label.toLowerCase().includes(search.toLowerCase());
  };

  const sortedOptions = [...options].sort((a, b) => a.label.localeCompare(b.label));

  if (searchable) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit gap-2 border-none bg-transparent">
            {value ? options.find(option => option.value === value)?.label : placeholder}
            <PiChevronSortVerticalStroke className="opacity-50 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Rechercher...`} />
            <CommandList>
              <CommandEmpty>Aucun {placeholder} trouvé.</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map(option => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      handleChange(value === option.value ? undefined : option.value);
                      setOpen(false);
                    }}
                    value={option.label}>
                    {option.label}
                    <Check className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Select onChange={handleChange} options={sortedOptions} placeholder={placeholder} className="w-fit bg-transparent border-none whitespace-nowrap" defaultValue={value ?? defaultValue} clearable />
  );
};
