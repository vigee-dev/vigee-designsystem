import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Container } from "../Container/Container";
import {
  ToggleGroup as ShadToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { cn } from "../lib/utils";

type Option = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;

  descr?: string;
  className?: string;
  disabled?: boolean;
  options: Option[];
};

export const Toggles = <T extends FieldValues>({
  form,
  name,
  descr,
  className,
  disabled,
  options,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Container className="p-1">
              <ShadToggleGroup
                type="single"
                className="w-full"
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                {options.map(option => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    aria-label={option.label}
                    className={cn("flex items-center gap-2 w-full h-24")}
                  >
                    {option.icon}
                    <span className="text-md">{option.label}</span>
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
