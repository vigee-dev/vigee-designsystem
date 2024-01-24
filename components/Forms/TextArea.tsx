"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

type Props<T extends z.ZodType<any, any>> = {
  form: UseFormReturn<z.infer<T> & FieldValues>;
  id?: string;
  name: Path<z.infer<T> & FieldValues>;
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

export default function TextArea<T extends z.ZodType<any, any, any>>({
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
        <FormItem className={className}>
          <FormLabel className="font-black text-primary">{label}</FormLabel>
          <Textarea
            name={name}
            id={id}
            placeholder={placeholder ?? ""}
            onChange={(e) => {
              if (count) {
                setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
              }
              onChange && onChange(e);
            }}
            maxLength={max}
            defaultValue={defaultValue ?? ""}
            className={`min-h-${minHeight || "10"} h-${
              minHeight || "10"
            } resize-none font-medium bg-input border-none`}
            onBlur={onBlur}
            disabled={disabled}
          />
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
