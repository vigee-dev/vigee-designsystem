import React, { useEffect, useState } from "react";
import { FormField, FormItem, FormLabel, FormDescription, FormMessage, FormControl } from "../ui/form";
import moment from "moment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
import { Input } from "../ui/input";
import { PiCalendarFilledContrast } from "../../icons/PikaIcons";

interface Props<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T>;
  name: Path<T>;
  className?: string;
  starting_date?: Date;
  disabled?: boolean;
  disabledKeys?: boolean;
  returnString?: boolean;
  years?: boolean;
  defaultValue?: string;
  required?: boolean;
}

export default function DatePicker<T extends FieldValues>({ label, form, name, className, starting_date, disabled, disabledKeys, returnString, defaultValue, required }: Props<T>) {
  const setToMidnight = (date: Date): Date => {
    const midnightDate = new Date(date);
    midnightDate.setHours(0, 0, 0, 0);
    return midnightDate;
  };

  const isDateDisabled = (date: Date): boolean => {
    const normalizedDate = setToMidnight(date);
    return starting_date ? normalizedDate < setToMidnight(new Date(starting_date)) : false;
  };

  const yearDefault = defaultValue ? moment(defaultValue).year().toString() : moment().year().toString();
  const dateDefault = defaultValue ? moment(defaultValue).toDate() : form && name ? form.getValues(name) : new Date();
  const inputDate = defaultValue ? moment(defaultValue).format("DD/MM/YYYY") : "";
  const [selectedYear, setSelectedYear] = useState(yearDefault);
  const [selectedDate, setSelectedDate] = useState<Date | null>(dateDefault);
  const [inputValue, setInputValue] = useState(inputDate);
  const [popoverOpen, setPopoverOpen] = useState(false);

  function convertDateToString(date: Date | string) {
    if (typeof date === "string") {
      return moment(date).format("DD/MM/YYYY");
    }
    return date.toLocaleDateString();
  }

  const formatInputDate = (value: string) => {
    // Supprime tout caractère non numérique
    const numbers = value.replace(/\D/g, "");

    // Insère les '/' après le jour et le mois si la longueur de la chaîne le permet
    let formattedValue = numbers;
    if (numbers.length > 2) {
      formattedValue = numbers.substring(0, 2) + "/" + numbers.substring(2);
    }
    if (numbers.length > 4) {
      formattedValue = formattedValue.substring(0, 5) + "/" + formattedValue.substring(5);
    }
    // Limite la longueur de la chaîne à 10 caractères pour correspondre au format DD/MM/YYYY
    return formattedValue.substring(0, 10);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedInputValue = formatInputDate(e.target.value);
    setInputValue(formattedInputValue);

    // Tente de convertir la chaîne formatée en un objet Date, si valide
    const date = moment(formattedInputValue, "DD/MM/YYYY", true);
    if (date.isValid()) {
      setSelectedDate(date.toDate());
      return date.toDate();
    } else {
      setSelectedDate(null);
      return null;
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setInputValue(moment(selectedDate).format("DD/MM/YYYY"));
    }
  }, [selectedDate]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col py-2">
          <FormLabel className="font-black text-primary">
            {label} {required && <span className="text-red-600 ml-1">*</span>}
          </FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={true}>
            <PopoverTrigger asChild>
              <FormControl>
                {!disabledKeys ? (
                  <Input
                    value={field.value ? convertDateToString(field.value) : inputValue}
                    onChange={e => {
                      const date = handleInputChange(e);
                      if (date) {
                        field.onChange(returnString ? moment(date).format("YYYY-MM-DD") : date);
                      } else {
                        // Gérer le cas où la date n'est pas valide / ou réinitialiser le champ
                        field.onChange(null);
                      }
                    }}
                    placeholder="Choisir une date"
                    className={cn("pl-3 text-left font-display font-medium bg-input border-none", !field.value && "text-muted-foreground", className)}
                    type="text"
                    disabled={disabled}
                  />
                ) : (
                  <Button disabled={disabled} variant={"outline"} className={cn(`pl-3 text-left font-display font-medium bg-input border-none`, !field.value && "text-muted-foreground", className)}>
                    {field.value ? moment(field.value).format("DD/MM/YYYY") : <span>Choisir une date</span>}

                    <PiCalendarFilledContrast className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                )}
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="start">
              <Calendar
                key={selectedYear}
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={date => {
                  setSelectedDate(date ?? null);
                  setPopoverOpen(false); // Ferme le Popover après la sélection d'une date
                  field.onChange(returnString ? moment(date).format("YYYY-MM-DD") : date);
                }}
                disabled={date => isDateDisabled(date)}
                locale={fr}
                initialFocus
                defaultMonth={selectedDate || new Date()}
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
