import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

import { Switch as SwitchShadcn } from "../ui/switch";
import { cn } from "../../lib/utils";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  name: Path<T>;
  descr?: string;

  className?: string;
};

export default function Switch<T extends FieldValues>({
  form,
  label,
  placeholder,
  required = true,
  name,
  descr,
  className,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between",
            className
          )}
        >
          <div className="space-y-0.5">
            <FormLabel className="text-base ">{label}</FormLabel>
            <FormDescription>{descr}</FormDescription>
          </div>
          <FormControl>
            <SwitchShadcn
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
