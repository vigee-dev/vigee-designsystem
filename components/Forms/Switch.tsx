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

import { Switch } from "../ui/switch";

type Props<T extends z.ZodType<any, any>> = {
  form: UseFormReturn<z.infer<T> & FieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  name: Path<z.infer<T> & FieldValues>;
  descr?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Select<T extends z.ZodType<any, any, any>>({
  form,
  label,
  placeholder,
  required = true,
  name,
  descr,
  children,
  className,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-input">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            <FormDescription>{descr}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
