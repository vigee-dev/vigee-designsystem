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
import {
  Select as ShadSelect,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="font-black text-primary">{label}</FormLabel>
          <ShadSelect
            onValueChange={field.onChange}
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger className="font-medium bg-input border-none  ">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-[200px] font-medium">
              {children}
            </SelectContent>
          </ShadSelect>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
