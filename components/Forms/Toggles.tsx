import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Container } from "../Container/Container";
import { ToggleGroup as ShadToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "../lib/utils";
import { Label } from "../ui/label";

type Option = {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
};

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  descr?: string;
  className?: string;
  optionsClassName?: string;
  disabled?: boolean;
  options: Option[];
  nowrap?: boolean;
  multi?: boolean;
  variant?: "default" | "small";
};

export const Toggles = <T extends FieldValues>({ form, name, label, descr, className, optionsClassName, disabled, options, nowrap = false, multi = false, variant = "default" }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full col-span-full">
          {label && <Label className="font-bold">{label}</Label>}
          <FormControl>
            <Container className={cn("p-1", className, variant === "small" && "border-none")}>
              <ShadToggleGroup
                type={multi ? "multiple" : "single"}
                className={cn(`w-full flex flex-col md:flex-row  flex-wrap`, nowrap && "flex-nowrap", variant === "small" && "flex-nowrap border-none w-fit")}
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}>
                {options.map(option => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    aria-label={option.label || ""}
                    disabled={option.disabled}
                    className={cn(
                      " items-center h-fit p-4 flex justify-between w-full gap-6 md:px-6 rounded-lg  border-none",
                      optionsClassName,
                      variant === "small" && "rounded-full border-none p-2 gap-0 justify-center data-[state=on]:bg-zinc-900 data-[state=on]:text-white md:px-3"
                    )}>
                    <div className="w-fit">{option.icon}</div>
                    {(option.label || option.description) && (
                      <div className="w-full text-left ">
                        {option.label && <span className="text-md font-bold ">{option.label}</span>}
                        {option.description && <p className="text-xs text-gray-500">{option.description}</p>}
                      </div>
                    )}
                  </ToggleGroupItem>
                ))}
              </ShadToggleGroup>
            </Container>
          </FormControl>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
