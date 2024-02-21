import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { enUS, fr } from "date-fns/esm/locale";

interface Props<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T>;
  name: Path<T>;
  className?: string;
  starting_date?: Date;
  disabled?: boolean;
  returnString?: boolean;
}

export default function DatePicker<T extends FieldValues>({
  label,
  form,
  name,
  className,
  starting_date,
  disabled,
  returnString,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col py-2">
          <FormLabel className="font-black text-primary">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    `pl-3 text-left font-display font-medium bg-input border-none  ${className}`,
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    moment(field.value).format("DD/MM/YYYY")
                  ) : (
                    <span>Choisir une date</span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={
                  returnString
                    ? date => {
                        const formatted_date =
                          moment(date).format("YYYY-MM-DD");
                        field.onChange(formatted_date);
                      }
                    : field.onChange
                } // Conditional onSelect
                disabled={date => {
                  if (starting_date) {
                    return date < starting_date;
                  }

                  return false;
                }}
                locale={fr}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
