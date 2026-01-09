"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQueryState } from "nuqs";
import { Select } from "../Select/Select";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PiCalendarDefaultDuoStroke } from "../../icons/PikaIcons";
import { Calendar } from "../ui/calendar";
import { cn } from "../lib/utils";
import { DateTime } from "luxon";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCallback, useMemo } from "react";

const DEFAULT_TZ = process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || "Europe/Paris";
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "fr-FR";

interface WeekOption {
  label: string;
  value: string;
}

export const generateWeekOptions = (
  year: number,
  formatString?: string
): WeekOption[] => {
  const weeks: WeekOption[] = [];

  let week = 1;
  let dt = DateTime.fromObject({ weekYear: year, weekNumber: week })
    .setZone(DEFAULT_TZ)
    .setLocale(DEFAULT_LOCALE);

  while (dt.weekYear === year) {
    const startOfWeek = dt.startOf("week");
    const endOfWeek = dt.endOf("week");

    const label = (() => {
      if (formatString)
        return `${startOfWeek.toFormat(formatString)} au ${endOfWeek.toFormat(formatString)}`;
      else
        return `Sem. ${week} du ${startOfWeek.toLocaleString(DateTime.DATE_FULL)} au ${endOfWeek.toLocaleString(DateTime.DATE_FULL)}`;
    })();

    weeks.push({ label, value: week.toString() });

    week++;
    dt = dt.plus({ weeks: 1 });
  }

  return weeks;
};

interface MonthOption {
  label: string;
  value: string;
}

export const generateMonthOptions = (year: number): MonthOption[] => {
  const months: MonthOption[] = [];

  for (let month = 1; month <= 12; month++) {
    const dt = DateTime.fromObject({ year, month })
      .setLocale(DEFAULT_LOCALE)
      .setZone(DEFAULT_TZ);

    const label = dt.toFormat("MMM");
    months.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: month.toString(),
    });
  }

  return months;
};

interface Props {
  years?: {
    value: string;
    label: string;
  }[];
  day?: boolean;
  showDay?: boolean;
  week?: boolean;
  month?: boolean;
  year?: boolean;
  defaultPeriod?: PeriodFilterViewType;
  startTransition?: (callback: () => void) => void;
}

type PeriodFilterViewType = "day" | "week" | "month" | "year";

export const PeriodFilters = ({
  years = [
    { label: "Cette année", value: new Date().getFullYear().toString() },
  ],
  defaultPeriod = "year",
  startTransition,
  showDay = true,
}: Props) => {
  const now = useMemo(
    () => DateTime.now().setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE),
    []
  );

  // Utiliser des valeurs par défaut stables basées sur "now" au moment du mount
  const defaultYear = useMemo(() => now.year.toString(), [now]);
  const defaultMonth = useMemo(() => now.month.toString(), [now]);
  const defaultWeek = useMemo(() => now.weekNumber.toString(), [now]);
  const defaultDay = useMemo(() => now.day.toString(), [now]);

  const [period, setPeriod] = useQueryState("period", {
    defaultValue: defaultPeriod,
    shallow: false,
  });

  const [week, setWeek] = useQueryState("week", {
    defaultValue: defaultWeek,
    shallow: false,
  });

  const [month, setMonth] = useQueryState("month", {
    defaultValue: defaultMonth,
    shallow: false,
  });

  const [day, setDay] = useQueryState("day", {
    defaultValue: defaultDay,
    shallow: false,
  });

  const [year, setYear] = useQueryState("year", {
    defaultValue: defaultYear,
    shallow: false,
  });

  const weekOptions = useMemo(
    () => generateWeekOptions(Number(year), "EEE dd MMMM"),
    [year]
  );

  const monthsOptions = useMemo(
    () => generateMonthOptions(Number(year)),
    [year]
  );

  const selectedDate = useMemo(
    () =>
      DateTime.fromObject(
        { year: Number(year), month: Number(month), day: Number(day) },
        { zone: DEFAULT_TZ, locale: DEFAULT_LOCALE }
      ),
    [year, month, day]
  );

  const handleSetUrlParameters = useCallback(
    (newYear: number, newMonth: number, newWeek: number, newDay: number) => {
      const update = () => {
        setYear(newYear.toString());
        setMonth(newMonth.toString());
        setWeek(newWeek.toString());
        setDay(newDay.toString());
      };

      if (startTransition) {
        startTransition(update);
      } else {
        update();
      }
    },
    [setYear, setMonth, setWeek, setDay, startTransition]
  );

  const handleDayChange = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const luxonDate = DateTime.fromJSDate(date, {
          zone: DEFAULT_TZ,
        }).setLocale(DEFAULT_LOCALE);
        handleSetUrlParameters(
          luxonDate.year,
          luxonDate.month,
          luxonDate.weekNumber,
          luxonDate.day
        );
      }
    },
    [handleSetUrlParameters]
  );

  const handleWeekChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined) return;
      const selectedWeek = Number(value);
      if (isNaN(selectedWeek)) return;
      // Garder l'année actuelle, ne changer que la semaine
      handleSetUrlParameters(
        Number(year),
        Number(month),
        selectedWeek,
        Number(day)
      );
    },
    [year, month, day, handleSetUrlParameters]
  );

  const handleMonthChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined) return;
      const selectedMonth = Number(value);
      if (isNaN(selectedMonth)) return;
      // Garder l'année actuelle, ne changer que le mois
      handleSetUrlParameters(
        Number(year),
        selectedMonth,
        Number(week),
        Number(day)
      );
    },
    [year, week, day, handleSetUrlParameters]
  );

  const handleYearChange = useCallback(
    (value: string | undefined) => {
      if (value === undefined) return;
      const selectedYear = Number(value);
      if (isNaN(selectedYear)) return;
      // Garder le mois actuel, ne changer que l'année
      handleSetUrlParameters(
        selectedYear,
        Number(month),
        Number(week),
        Number(day)
      );
    },
    [month, week, day, handleSetUrlParameters]
  );

  const onTabChange = useCallback(
    (value: string) => {
      const update = () => setPeriod(value);
      if (startTransition) {
        startTransition(update);
      } else {
        update();
      }
    },
    [setPeriod, startTransition]
  );

  const goToPreviousDay = useCallback(() => {
    const previousDay = selectedDate.minus({ days: 1 });
    handleSetUrlParameters(
      previousDay.year,
      previousDay.month,
      previousDay.weekNumber,
      previousDay.day
    );
  }, [selectedDate, handleSetUrlParameters]);

  const goToNextDay = useCallback(() => {
    const nextDay = selectedDate.plus({ days: 1 });
    handleSetUrlParameters(
      nextDay.year,
      nextDay.month,
      nextDay.weekNumber,
      nextDay.day
    );
  }, [selectedDate, handleSetUrlParameters]);

  return (
    <div>
      <Tabs
        value={period}
        className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between bg-transparent md:border border-none items-center bg-white md:bg-transparent  md:p-1 rounded-xl "
        onValueChange={onTabChange}
      >
        <div className="gap-4 flex items-center w-full">
          <TabsList className="w-full md:w-fit">
            {showDay && (
              <TabsTrigger className="w-full md:w-fit" value="day">
                Jour
              </TabsTrigger>
            )}
            {week && (
              <TabsTrigger className="w-full md:w-fit" value="week">
                Hebdo
              </TabsTrigger>
            )}
            {month && (
              <TabsTrigger className="w-full md:w-fit" value="month">
                Mois
              </TabsTrigger>
            )}
            {year && (day || month || week) && (
              <TabsTrigger className="w-full md:w-fit" value="year">
                Année
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 gap-2 items-center w-full md:w-fit  md:pt-0 ">
          <TabsContent value="day" className="w-full md:w-fit ">
            <div className="relative flex items-center rounded-md bg-white md:items-stretch w-full ">
              <button
                type="button"
                className="flex border-none shadow-none h-9 w-12 items-center justify-center border-slate-300 pr-1 text-slate-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
                onClick={goToPreviousDay}
              >
                <span className="sr-only">Précédent</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full md:w-fit md:bg-input font-bold text-gray-800 "
                    )}
                  >
                    <PiCalendarDefaultDuoStroke className="mr-2 h-4 w-4 " />
                    {selectedDate.toLocaleString({
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    initialFocus
                    locale={fr}
                    defaultMonth={selectedDate.toJSDate()}
                    selected={selectedDate.toJSDate()}
                    onSelect={handleDayChange}
                  />
                </PopoverContent>
              </Popover>

              <button
                type="button"
                className="flex h-9 w-12 items-center justify-center rounded-r-md pl-1 text-slate-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
                onClick={goToNextDay}
              >
                <span className="sr-only">Suivant</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </TabsContent>

          <TabsContent value="week" className="w-full md:w-fit mt-0">
            <Select
              className="w-full md:w-fit font-bold md:bg-input text-gray-800"
              options={weekOptions}
              onChange={handleWeekChange}
              value={week}
            />
          </TabsContent>

          <TabsContent value="month" className="w-full md:w-fit mt-0">
            <Select
              className="w-full md:w-fit font-bold md:bg-input text-gray-800"
              options={monthsOptions}
              onChange={handleMonthChange}
              value={month}
            />
          </TabsContent>

          <Select
            className="w-full md:w-fit font-bold md:bg-input text-gray-800"
            options={years}
            onChange={handleYearChange}
            value={year}
            placeholder={"Année"}
          />
        </div>
      </Tabs>
    </div>
  );
};
