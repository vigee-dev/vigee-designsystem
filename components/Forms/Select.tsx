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
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  helpText?: string;
};

export default function Select<T extends FieldValues>({
  form,
  label,
  placeholder,
  required = true,
  name,
  descr,
  children,
  className,
  disabled,
  onChange,
  value,
  helpText,
}: Props<T>) {
  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          {helpText ? (
            <Tooltip message={helpText}>
              <div className="flex items-center justify-between ">
                {label && (
                  <FormLabel className="font-black text-primary">
                    {label}
                  </FormLabel>
                )}

                <PiQuestionMarkCircleDuoStroke className="w-6 h-6 hover:text-primary hover:cursor-pointer text-gray-400" />
              </div>
            </Tooltip>
          ) : (
            label && (
              <FormLabel className="font-black text-primary">{label}</FormLabel>
            )
          )}
          <ShadSelect
            onValueChange={field.onChange}
            value={String(field.value)}
            disabled={disabled}
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
  ) : (
    <FormItem className={className}>
      <FormLabel className="font-black text-primary">{label}</FormLabel>
      <ShadSelect
        onValueChange={onChange}
        value={String(value)}
        disabled={disabled}
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
  );
}
