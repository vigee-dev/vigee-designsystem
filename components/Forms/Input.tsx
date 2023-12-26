import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input as ShadInput } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

type Props<T extends z.ZodType<any, any>> = {
  form?: UseFormReturn<z.infer<T> & FieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  name: Path<z.infer<T> & FieldValues>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  min?: number;
  max?: number;
};

export default function Input<T extends z.ZodType<any, any, any>>({
  form,
  label,
  placeholder,
  type = "text",
  required = true,
  name,
  descr,
  className,
  disabled,
  id,
  min,
  max,
}: Props<T>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <ShadInput
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={disabled}
              id={id}
              min={min}
              max={max}
            />
          </FormControl>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
