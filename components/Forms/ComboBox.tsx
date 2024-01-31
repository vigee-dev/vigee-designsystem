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
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { FormLabel } from "../ui/form";

interface Item {
  value: string;
  label: string;
}
type ComboBoxProps<T extends z.ZodType<any, any>> = {
  form: UseFormReturn<z.infer<T> & FieldValues>;
  name: Path<z.infer<T> & FieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  items: Item[];
};

export function ComboBox<T extends z.ZodType<any, any, any>>({
  items,
  form,
  name,
  label,
  placeholder = "Sélectionnez...",
  required = true,
}: ComboBoxProps<T>) {
  const { control, setValue, watch } = form;
  const value = watch(name);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <FormLabel className="font-black text-primary">{label}</FormLabel>
      )}

      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  const valueToUpdate =
                    currentValue === value ? undefined : currentValue;
                  // Assurez-vous que la mise à jour respecte le type attendu par le schéma Zod.
                  setValue(
                    name as Path<z.infer<T> & FieldValues>,
                    valueToUpdate as any
                  );
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
