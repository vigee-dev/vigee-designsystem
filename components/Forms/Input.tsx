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
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  name: Path<T>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  helpText?: string;
};

export default function Input<T extends FieldValues>({
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
  step,
  helpText,
}: Props<T>) {
  return (
    <FormField
      control={form?.control}
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

          <FormControl>
            <ShadInput
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={disabled}
              id={id}
              min={min}
              max={max}
              step={step}
              className="sm:text-[16px] md:text-sm font-medium bg-input border-none"
            />
          </FormControl>

          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
