import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { Input as ShadInput } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { PiExternalLinkCircleDuoSolid, PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";

import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import { Label } from "../../components/ui/label";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import React from "react";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  requiredFields?: boolean;
  name?: Path<T>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  helpComponent?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  minimalist?: boolean;
  maxLength?: number;
  link?: string | null;
};

export default function Input<T extends FieldValues>({
  form,
  label,
  placeholder,
  type = "text",
  required = false,
  name,
  descr,
  className,
  disabled,
  id,
  min,
  max,
  maxLength,
  step,
  helpComponent,
  onChange,
  value,
  minimalist,
  link,
}: Props<T>) {
  const [charCount, setCharCount] = useState(name ? form?.getValues(name)?.length || 0 : 0);
  return form && name ? (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          <HoverCard>
            <div className="flex items-center justify-between ">
              {label && (
                <FormLabel className="font-black text-primary mt-2 flex items-center ">
                  {label}
                  {required && <span className="text-red-600 mx-1 ">*</span>}
                  {maxLength && (
                    <div className="text-gray-500 text-xs font-medium pl-1">
                      {charCount}
                      {maxLength && `/ ${maxLength}`}
                    </div>
                  )}
                </FormLabel>
              )}
              <div className="flex items-center gap-2">
                {helpComponent && (
                  <HoverCardTrigger>
                    <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
                  </HoverCardTrigger>
                )}
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <PiExternalLinkCircleDuoSolid className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
                  </a>
                )}
              </div>
            </div>

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
                className={cn(
                  "text-[16px] md:text-sm font-medium bg-input border-none ",
                  className,
                  minimalist &&
                    "focus-visible:ring-offset-0 bg-transparent font-bold text-black placeholder:text-gray-300 selection:border-none focus-visible:ring-0 ring-0 border-none  ring-offset-none p-0 focus:outline-none focus:ring-0 caret-black"
                )}
                onChange={e => {
                  if (maxLength) setCharCount(e.target.value.length);
                  field.onChange(e);
                  if (onChange) onChange(e);
                }}
              />
            </FormControl>
          </HoverCard>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  ) : (
    <div className={cn("space-y-2", className)}>
      <HoverCard>
        <div className="flex items-center justify-between py-1">
          {label && <Label className="font-black text-primary">{label}</Label>}
          {helpComponent && (
            <HoverCardTrigger>
              <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
            </HoverCardTrigger>
          )}
        </div>

        <div className="flex items-center gap-2">
          {helpComponent && (
            <HoverCardTrigger>
              <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
            </HoverCardTrigger>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <PiExternalLinkCircleDuoSolid className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
            </a>
          )}
        </div>

        <ShadInput
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          id={id}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={value}
          className="text-[16px] md:text-sm font-medium bg-input border-none"
        />
      </HoverCard>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>
  );
}
