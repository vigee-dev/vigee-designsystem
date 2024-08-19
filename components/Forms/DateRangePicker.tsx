"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import { Calendar } from "../ui/calendar";
import React from "react";
import { Matcher } from "react-day-picker";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name: Path<T>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  helpComponent?: React.ReactNode;
  disabledDates?: Matcher | Matcher[] | undefined;
}

function DatePickerRange<T extends FieldValues>({ form, name, label, required, descr, className, disabled, helpComponent, placeholder, id, disabledDates }: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const textValue = (() => {
          const { value } = field
          if (value?.from instanceof Date && value?.to instanceof Date) return format(value.from, 'dd/MM/yyyy') + ' - ' + format(value.to, 'dd/MM/yyyy');
          return placeholder || 'Plage de date'
        })()

        return (
          <FormItem className="flex flex-col">
          {label && (
            <FormLabel className="font-black text-primary mt-2 flex items-center ">
              {label}
              {required && <span className="text-red-600 mx-1 ">*</span>}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    className,
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {textValue}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDates}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
        )
      }}
    />
  )
}

export default DatePickerRange