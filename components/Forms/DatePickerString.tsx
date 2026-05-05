/**
 * @description Sélecteur de date intégré react-hook-form qui stocke la valeur au format string "YYYY-MM-DD" et l'affiche en "DD/MM/YYYY".
 * @useWhen formulaire RHF nécessitant une date stockée en string ISO (ex: API REST) → utiliser DatePickerString | date de début/fin avec borne minimale configurable → utiliser DatePickerString via `starting_date` | champ date simple dans un Form Zod → utiliser DatePickerString
 * @dontUseFor sélection d'une plage de dates → utiliser DatePickerRange | date avec presets (aujourd'hui, semaine dernière…) → utiliser DatePickerWithPresets
 * @example <DatePickerString form={form} name="birth_date" label="Date de naissance" />
 */
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
import { cn } from "../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { fr } from "date-fns/locale";

interface Props<T extends z.ZodType<any, any>> {
  label?: string;
  form: UseFormReturn<z.infer<T> & FieldValues>;
  name: Path<z.infer<T> & FieldValues>;
  className?: string;
  starting_date?: Date;
  disabled?: boolean;
}

export default function DatePicker<T extends z.ZodType<any, any, any>>({
  label,
  form,
  name,
  className,
  starting_date,
  disabled,
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

                  <CalendarIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={date => {
                  const formatted_date = moment(date).format("YYYY-MM-DD");
                  field.onChange(formatted_date);
                }}
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
