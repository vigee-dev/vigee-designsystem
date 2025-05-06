import React from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  PiCheckTickSingleStroke,
  PiSearchBigStroke,
} from "../../icons/PikaIcons";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { FormDescription, FormField, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  sublabel?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  helpComponent?: React.ReactNode;
  isBoolean?: boolean;
  options?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    color?: string;
    disabled?: boolean;
  }[];
  variant?: "default" | "outlined";
  searchable?: boolean;
};

export default function CommandListSelect<T extends FieldValues>({
  form,
  label,
  sublabel,
  placeholder,
  required = true,
  name,
  descr,
  children,
  className,
  disabled,
  onChange,
  value,
  helpComponent,
  isBoolean = false,
  options,
  variant = "default",
  searchable = true,
}: Props<T>) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (newValue: string) => {
    if (form?.control && name) {
      if (!isBoolean) {
        form.setValue(name, newValue as PathValue<T, Path<T>>);
      } else {
        form.setValue(name, (newValue === "true") as PathValue<T, Path<T>>);
      }
    }
    if (onChange) onChange(newValue);
  };

  const currentValue =
    (form?.control && name ? form.watch(name) : value) ?? options?.[0]?.value;

  const currentLabel =
    options?.find((option) => option.value === currentValue)?.label ||
    placeholder ||
    options?.[0]?.label;

  const sortedOptions = [...(options || [])].sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const renderContent = () => (
    <div
      className={cn(
        className,
        variant === "default" && "border-none",
        "flex flex-col gap-2"
      )}
    >
      <Label className="font-black text-primary ">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-medium bg-input",
              variant === "outlined" &&
                "border-gray-400 border rounded-lg bg-transparent mt-2"
            )}
            disabled={disabled}
          >
            {currentLabel}
            <PiSearchBigStroke className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            {searchable && <CommandInput placeholder="Rechercher..." />}
            <CommandList>
              <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      handleChange(option.value);
                      setOpen(false);
                    }}
                    disabled={option.disabled}
                  >
                    <div
                      className={cn("flex items-center gap-2", option.color)}
                    >
                      {option.icon}
                      {option.label}
                    </div>
                    <PiCheckTickSingleStroke
                      className={cn(
                        "ml-auto h-4 w-4 text-success",
                        currentValue === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {descr && <FormDescription>{descr}</FormDescription>}
      {form?.control && name && <FormMessage />}
    </div>
  );

  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      rules={{ required }}
      render={() => renderContent()}
    />
  ) : (
    renderContent()
  );
}
