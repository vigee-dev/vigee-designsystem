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
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";

interface Props<T extends FieldValues> {
  label?: string;
  form: UseFormReturn<T>;
  name: Path<T>;
  className?: string;
  starting_date?: Date;
  disabled?: boolean;
}

export default function DatePicker<T extends FieldValues>({
  label,
  form,
  name,
  className,
  starting_date,
  disabled,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col py-2">
          <FormLabel className="font-black text-primary">{label}</FormLabel>
          {/* `modal` est indispensable : sans lui, le calendrier ouvert dans un
              Drawer (vaul) ou un Dialog s'affiche mais ne reçoit aucun clic. */}
          <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
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
                // La valeur est stockée en chaîne : le calendrier attend une
                // Date, sinon rien n'apparaît jamais sélectionné.
                selected={field.value ? moment(field.value).toDate() : undefined}
                defaultMonth={
                  field.value ? moment(field.value).toDate() : starting_date
                }
                onSelect={date => {
                  if (!date) return;
                  field.onChange(moment(date).format("YYYY-MM-DD"));
                  // Le choix est fait : on referme, comme dans tout sélecteur.
                  setIsOpen(false);
                }}
                disabled={date => {
                  if (starting_date) {
                    // Comparaison au jour près : une borne portant une heure
                    // interdisait sinon le jour même.
                    return (
                      moment(date).startOf("day") <
                      moment(starting_date).startOf("day")
                    );
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
