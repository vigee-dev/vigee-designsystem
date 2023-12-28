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

interface Props<T extends z.ZodType<any, any>> {
  label?: string;
  form: UseFormReturn<z.infer<T> & FieldValues>;
  name: Path<z.infer<T> & FieldValues>;
  className?: string;
  starting_date?: Date;
}

export default function DatePicker<T extends z.ZodType<any, any, any>>({
  label,
  form,
  name,
  className,
  starting_date,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col ">
          <FormLabel className="font-black text-primary">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    `pl-3 text-left font-display font-medium bg-gray-100 border-none  text-slate ${className}`,
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
                onSelect={field.onChange}
                disabled={(date) => {
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
