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

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

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
  helpComponent?: React.ReactNode;
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
  helpComponent,
}: Props<T>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          <HoverCard>
            <div className="flex items-center justify-between ">
              {label && (
                <FormLabel className="font-black text-primary mt-2">
                  {label}
                </FormLabel>
              )}
              {helpComponent && (
                <HoverCardTrigger>
                  <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
                </HoverCardTrigger>
              )}
            </div>

            {helpComponent && (
              <HoverCardContent>
                <div className="p-2">{helpComponent}</div>
              </HoverCardContent>
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
          </HoverCard>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
