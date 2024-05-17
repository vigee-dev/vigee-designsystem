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
  description: string;
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
                    className={cn(
                      " items-center h-24 flex justify-between w-full gap-6"
                    )}
                  >
                    <div className="w-fit">{option.icon}</div>
                    <div className="w-full text-left ">
                      <span className="text-md font-bold ">{option.label}</span>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
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
