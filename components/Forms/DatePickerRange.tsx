"use client";

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { fr } from "date-fns/locale";
import { useQueryState } from "nuqs";
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

// Fonction utilitaire pour détecter la période à partir des dates
const getPeriodFromDates = (from?: Date, to?: Date): string | undefined => {
  const now = new Date();

  if (
    from?.toDateString() ===
      startOfWeek(now, { weekStartsOn: 1 }).toDateString() &&
    to?.toDateString() === endOfWeek(now, { weekStartsOn: 1 }).toDateString()
  )
    return "thisWeek";
  if (
    from?.toDateString() === startOfMonth(now).toDateString() &&
    to?.toDateString() === endOfMonth(now).toDateString()
  )
    return "thisMonth";

  // Last month
  const lastMonth = new Date(now);
  lastMonth.setMonth(now.getMonth() - 1);
  if (
    from?.toDateString() === startOfMonth(lastMonth).toDateString() &&
    to?.toDateString() === endOfMonth(lastMonth).toDateString()
  )
    return "lastMonth";

  // Same month last year
  const sameMonthLastYear = new Date(now);
  sameMonthLastYear.setFullYear(now.getFullYear() - 1);
  if (
    from?.toDateString() === startOfMonth(sameMonthLastYear).toDateString() &&
    to?.toDateString() === endOfMonth(sameMonthLastYear).toDateString()
  )
    return "sameMonthLastYear";

  // This year
  if (
    from?.toDateString() === startOfYear(now).toDateString() &&
    to?.toDateString() === endOfYear(now).toDateString()
  )
    return "thisYear";

  // Last year
  const lastYear = new Date(now.getFullYear() - 1, 0, 1);
  if (
    from?.toDateString() === startOfYear(lastYear).toDateString() &&
    to?.toDateString() === endOfYear(lastYear).toDateString()
  )
    return "lastYear";

  // All time (aucune date)
  if (!from && !to) return "allTime";

  return undefined;
};

interface DatePickerRangeProps {
  className?: string;
  select?: boolean;
  label?: string;
  onChange?: (date: DateRange) => void;
  disabledDays?: Matcher | Matcher[] | undefined;
  disabled?: boolean;
}

const DatePickerRange = ({
  className,
  select,
  label,
  onChange,
  disabledDays,
  disabled = false,
}: DatePickerRangeProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isManualSelection, setIsManualSelection] = React.useState(false);

  // Gestion des query params directement dans le composant
  const [startDate, setStartDate] = useQueryState("start_date");
  const [endDate, setEndDate] = useQueryState("end_date");

  // Calcul du range à partir de l'URL
  const dateRange = React.useMemo<DateRange | undefined>(() => {
    if (startDate && endDate) {
      const from = parseISO(startDate);
      const to = parseISO(endDate);
      return { from, to };
    }
    if (startDate && !endDate) {
      return { from: parseISO(startDate), to: parseISO(startDate) };
    }
    if (!startDate && endDate) {
      return { from: parseISO(endDate), to: parseISO(endDate) };
    }
    return undefined;
  }, [startDate, endDate]);

  // Période sélectionnée (select)
  const [selectedPeriod, setSelectedPeriod] = React.useState<
    string | undefined
  >(() => getPeriodFromDates(dateRange?.from, dateRange?.to));
  React.useEffect(() => {
    setSelectedPeriod(getPeriodFromDates(dateRange?.from, dateRange?.to));
  }, [dateRange]);

  // Fonction centralisée pour gérer les changements de date
  const handleDateChange = React.useCallback(
    (newDate: DateRange | undefined, newPeriod?: string) => {
      if (onChange && newDate) {
        onChange(newDate);
      }
      // Mise à jour de l'URL via nuqs
      const startDateStr = newDate?.from
        ? format(newDate.from, "yyyy-MM-dd")
        : "";
      const endDateStr = newDate?.to ? format(newDate.to, "yyyy-MM-dd") : "";
      setStartDate(startDateStr || null);
      setEndDate(endDateStr || null);
      setSelectedPeriod(newPeriod);
    },
    [onChange, setStartDate, setEndDate]
  );

  // Handler spécifique pour la sélection manuelle dans le calendrier
  const handleManualDateChange = React.useCallback(
    (newDate: DateRange | undefined) => {
      setIsManualSelection(true);
      // Détecter automatiquement si la sélection manuelle correspond à une période
      const detectedPeriod = newDate
        ? getPeriodFromDates(newDate.from, newDate.to)
        : undefined;
      handleDateChange(newDate, detectedPeriod);
      setTimeout(() => setIsManualSelection(false), 100);
    },
    [handleDateChange]
  );

  const handleSelectChange = (value: string) => {
    if (value === selectedPeriod) {
      handleDateChange(undefined, undefined);
      return;
    }
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
    handleDateChange(newDate, value);
    setIsOpen(false);
  };

  const handleReset = () => {
    handleDateChange(undefined, undefined);
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
                !dateRange && "text-muted-foreground",
                className
              )}
            >
              <PiCalendarRangeDuoSolid className="mr-2 h-4 w-4 text-primary-light" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd LLL y", { locale: fr })} -{" "}
                    {format(dateRange.to, "dd LLL y", { locale: fr })}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y", { locale: fr })
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
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleManualDateChange}
                numberOfMonths={1}
                locale={fr}
              />
              {select && (
                <Select
                  value={selectedPeriod}
                  onValueChange={handleSelectChange}
                >
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
                    <SelectItem value="lastYear">
                      {"L'année dernière"}
                    </SelectItem>
                    <SelectItem value="sameMonthLastYear">
                      {"Même mois l'année dernière"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
              <Button
                onClick={handleReset}
                className="mt-2"
                disabled={!dateRange || !dateRange.from}
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
