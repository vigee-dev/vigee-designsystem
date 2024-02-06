"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import { fr } from "date-fns/esm/locale";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { Label } from "../ui/label";
import {
  PiCalendarCheckContrast,
  PiCalendarCheckDuoSolid,
  PiCalendarCheckDuoStroke,
  PiCalendarCheckSolid,
} from "../../icons/PikaIcons";

interface DatePickerRangeProps  {
  date: DateRange | undefined; 
  setDate: (newDate: DateRange | undefined) => void; // Fonction pour mettre à jour l'état externe
  className?: string;
  select?: boolean;
  label?: string;
  onChange?: (date : DateRange) => void;
}

export function DatePickerRange({
  className,
  date,
  setDate,
  select,
  label,
  onChange,
}: DatePickerRangeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  let newDate: DateRange | undefined;
  
  const handleSelectChange = (value: string) => {
    const lastYear = new Date().getFullYear() - 1;
   switch (value) {
    case "thisWeek":
      newDate = {
        from: startOfWeek(new Date(), { weekStartsOn: 1 }),
        to: endOfWeek(new Date(), { weekStartsOn: 1 }),
      };
      break;
    case "thisMonth":
      newDate = { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
      break;
    case "thisYear":
      newDate = { from: startOfYear(new Date()), to: endOfYear(new Date()) };
      break;
    case "lastYear":
      newDate = {
        from: startOfYear(new Date(new Date().getFullYear() - 1, 0, 1)), // Début de l'année dernière
        to: endOfYear(new Date(new Date().getFullYear() - 1, 11, 31)), // Fin de l'année dernière
      };
      break;
    case "allTime":
    newDate = {
        from: undefined,
        to:undefined,
      };
      break;
    default:
      return; // S'assurer que la fonction s'arrête si aucune correspondance n'est trouvée
  }

  setDate(newDate); // Met à jour l'état avec la nouvelle plage de dates
  if (onChange && newDate) {
    onChange(newDate); // Appelle onChange avec la nouvelle valeur directement
  }
  setIsOpen(false); // Ferme le Popover
};


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col gap-y-1 w-full">
          {label && (
            <Label className="font-bold text-primary-light">{label}</Label>
          )}
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "md:w-[260px] justify-start text-left font-normal w-full bg-input border-0",
                !date && "text-muted-foreground"
              )}
            >
              <PiCalendarCheckDuoSolid className="mr-2 h-4 w-4 text-primary-light" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd LLL y", { locale: fr })} -{" "}
                    {format(date.to, "dd LLL y", { locale: fr })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: fr })
                )
              ) : (
                <span>Choisir une période</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="flex flex-col p-2">
              <PopoverClose>
                {select && (
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une période" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="thisWeek">Cette semaine</SelectItem>
                      <SelectItem value="thisMonth">Ce mois-ci</SelectItem>
                      <SelectItem value="thisYear">Cette année</SelectItem>
                      <SelectItem value="lastYear">
                        {"L'année dernière"}
                      </SelectItem>
                      <SelectItem value="allTime">Depuis le début</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </PopoverClose>

              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(selectedDate: DateRange | undefined) => {
                  setDate(selectedDate);
                }}
                numberOfMonths={2}
                locale={fr}
              />
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
}
