"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  id?: string;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  count?: boolean;
  max?: number;
  descr?: string;
  defaultValue?: string;
  className?: string;
  minHeight?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea<T extends FieldValues>({
  form,
  id,
  name,
  required,
  label,
  placeholder,
  count,
  max,
  minHeight = "32",
  defaultValue,
  onBlur,
  onChange,
  className,
  descr,
  disabled,
}: Props<T>) {
  const [charCount, setCharCount] = useState(0); // État local pour le compteur de caractères

  return (
    <FormField
      control={form.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormField
          control={form?.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>{descr}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  );
}
