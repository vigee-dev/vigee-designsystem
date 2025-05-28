"use client";

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";
import { DateRange, Matcher } from "react-day-picker";
import { PiCalendarRangeDuoSolid } from "../../icons/PikaIcons";
import { cn } from "../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

const DatePickerRange = ({
  className,
  date,
  setDate,
  label,
  onChange,
  disabledDays,
  disabled = false,
}: DatePickerRangeProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>();

  const handleSelectChange = (value: string) => {
    if (value === selectedPeriod) {
      setSelectedPeriod(undefined);
      setDate(undefined);
      if (onChange) {
        onChange({ from: undefined, to: undefined });
      }
      return;
    }

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
          from: startOfYear(new Date(new Date().getFullYear() - 1, 0, 1)),
          to: endOfYear(new Date(new Date().getFullYear() - 1, 11, 31)),
        };
        break;
      case "allTime":
        newDate = {
          from: undefined,
          to: undefined,
        };
        break;
      default:
        return;
    }

    setDate(newDate);
    if (onChange && newDate) {
      onChange(newDate);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    setDate(undefined);
    setSelectedPeriod(undefined);
    if (onChange) {
      onChange({ from: undefined, to: undefined });
    }
    // Reset URL parameters
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete("start_date");
    currentParams.delete("end_date");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex flex-col gap-y-1 w-full">
          {label && <Label className="font-bold text-primary">{label}</Label>}
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal w-full bg-gray-100 border-0",
                !date && "text-muted-foreground",
                className
              )}
            >
              <PiCalendarRangeDuoSolid className="mr-2 h-4 w-4 text-primary-light" />
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
              <Calendar
                disabled={disabledDays || disabled}
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (onChange && newDate) {
                    onChange(newDate);
                  }
                }}
                numberOfMonths={1}
                locale={fr}
              />
              <Select value={selectedPeriod} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une période">
                    {selectedPeriod
                      ? selectedPeriod === "thisWeek"
                        ? "Cette semaine"
                        : selectedPeriod === "thisMonth"
                          ? "Ce mois-ci"
                          : selectedPeriod === "thisYear"
                            ? "Cette année"
                            : selectedPeriod === "lastMonth"
                              ? "Le mois dernier"
                              : selectedPeriod === "lastYear"
                                ? "L'année dernière"
                                : selectedPeriod === "sameMonthLastYear"
                                  ? "Même mois l'année dernière"
                                  : ""
                      : "Choisir une période"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="thisWeek">Cette semaine</SelectItem>
                  <SelectItem value="thisMonth">Ce mois-ci</SelectItem>
                  <SelectItem value="thisYear">Cette année</SelectItem>
                  <SelectItem value="lastMonth">Le mois dernier</SelectItem>
                  <SelectItem value="lastYear">L'année dernière</SelectItem>
                  <SelectItem value="sameMonthLastYear">
                    Même mois l'année dernière
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleReset}
                className="mt-2"
                disabled={!date || !date.from}
              >
                Réinitialiser
              </Button>
            </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>
  );
};

export default DatePickerRange;
