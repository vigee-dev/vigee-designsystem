"use client";

import * as React from "react";
import { DateRange, Matcher } from "react-day-picker";
import { fr } from "date-fns/locale";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { Label } from "../ui/label";
import { PiCalendarRangeDuoSolid } from "../../icons/PikaIcons";

interface DatePickerRangeProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>; // Fonction pour mettre à jour l'état externe
  className?: string;
  select?: boolean;
  label?: string;
  onChange?: (date: DateRange) => void;
  disabledDays?: Matcher | Matcher[] | undefined;
  disabled?: boolean;
}

const DatePickerRange = ({ className, date, setDate, select, label, onChange, disabledDays, disabled = false }: DatePickerRangeProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>();

  const handleSelectChange = (value: string) => {
    setSelectedPeriod(value);
    let newDate: DateRange | undefined;

    switch (value) {
      case "thisWeek":
        newDate = {
          from: startOfWeek(new Date(), { weekStartsOn: 1 }),
          to: endOfWeek(new Date(), { weekStartsOn: 1 }),
        };
        break;
      case "thisMonth":
        newDate = {
          from: startOfMonth(new Date()),
          to: endOfMonth(new Date()),
        };
        break;
      case "lastMonth":
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        newDate = {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth),
        };
        break;
      case "sameMonthLastYear":
        const sameMonthLastYear = new Date();
        sameMonthLastYear.setFullYear(sameMonthLastYear.getFullYear() - 1);
        newDate = {
          from: startOfMonth(sameMonthLastYear),
          to: endOfMonth(sameMonthLastYear),
        };
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
          to: undefined,
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
          {label && <Label className="font-bold text-primary">{label}</Label>}
          <PopoverTrigger asChild>
            <Button disabled={disabled} id="date" variant={"outline"} className={cn("justify-start text-left font-normal w-full bg-gray-100 border-0", !date && "text-muted-foreground", className)}>
              <PiCalendarRangeDuoSolid className="mr-2 h-4 w-4 text-primary-light" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd LLL y", { locale: fr })} - {format(date.to, "dd LLL y", { locale: fr })}
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
                  <Select value={selectedPeriod} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une période" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="thisWeek">Cette semaine</SelectItem>
                      <SelectItem value="thisMonth">Ce mois-ci</SelectItem>
                      <SelectItem value="thisYear">Cette année</SelectItem>
                      <SelectItem value="lastMonth">Le mois dernier</SelectItem>
                      <SelectItem value="lastYear">L'année dernière</SelectItem>
                      <SelectItem value="sameMonthLastYear">Même mois l'année dernière</SelectItem>
                      <SelectItem value="allTime">Depuis le début</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </PopoverClose>

              <Calendar
                disabled={disabledDays || disabled}
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={newDate => {
                  setDate(newDate);
                  setSelectedPeriod(undefined);
                }}
                numberOfMonths={1}
                locale={fr}
              />
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
};

export default DatePickerRange;
