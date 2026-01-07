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
import { useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
/*
import { useGlobalTransition } from "../../../../Contexts/GlobalTransitionContext";
*/

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

// TODO duplicate with another type from WeekViewFilter, the two components should be the same
type PeriodFilterViewType = "day" | "week" | "month" | "year";

// TODO refactor WeekViewFilters and PeriodFilters together as they go the same thing, redefine it to a big 'Filters' component
export const PeriodFilters = ({
  years = [
    { label: "Cette année", value: new Date().getFullYear().toString() },
  ],
  defaultPeriod = "year",
  startTransition,
  showDay = true,
}: Props) => {
  const now = DateTime.now().setZone(DEFAULT_LOCALE).setLocale(DEFAULT_LOCALE);
  const searchParams = useSearchParams();

  const [period, setPeriod] = useQueryState("period", {
    defaultValue: defaultPeriod,
    shallow: false,
  });

  const [week, setWeek] = useQueryState("week", {
    defaultValue:
      searchParams.get("week") ||
      DateTime.now()
        .setZone(DEFAULT_TZ)
        .setLocale(DEFAULT_LOCALE)
        .weekNumber.toString(),
    shallow: false,
  });
  const [month, setMonth] = useQueryState("month", {
    defaultValue:
      searchParams.get("month") ||
      DateTime.now()
        .setZone(DEFAULT_TZ)
        .setLocale(DEFAULT_LOCALE)
        .month.toString(),
    shallow: false,
  });
  const [day, setDay] = useQueryState("day", {
    defaultValue:
      searchParams.get("day") ||
      DateTime.now()
        .setZone(DEFAULT_TZ)
        .setLocale(DEFAULT_LOCALE)
        .day.toString(),
    shallow: false,
  });
  const [year, setYear] = useQueryState("year", {
    defaultValue:
      searchParams.get("year") ||
      DateTime.now()
        .setZone(DEFAULT_TZ)
        .setLocale(DEFAULT_LOCALE)
        .year.toString(),
    shallow: false,
  });

  const weekOptions = generateWeekOptions(Number(year), "EEE dd MMMM");
  const monthsOptions = generateMonthOptions(Number(year));
  const selectedDate = DateTime.fromObject(
    { year: Number(year), month: Number(month), day: Number(day) },
    { zone: DEFAULT_TZ, locale: DEFAULT_LOCALE }
  );

  const handleSetUrlParameters = (
    year: number,
    month: number,
    week: number,
    day: number
  ) => {
    if (startTransition) {
      startTransition(() => {
        setYear(year.toString());
        setMonth(month.toString());
        setWeek(week.toString());
        setDay(day.toString());
      });
    } else {
      setYear(year.toString());
      setMonth(month.toString());
      setWeek(week.toString());
      setDay(day.toString());
    }
  };

  const handleDayChange = (date: Date | undefined) => {
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
  };

  const handleWeekChange = (value: string | undefined) => {
    if (value === undefined) return;
    const selectedWeek = !isNaN(Number(value)) ? Number(value) : now.weekNumber;
    // Ne pas mettre à jour si c'est déjà la même valeur
    if (selectedWeek === Number(week)) return;
    // Lire les valeurs directement depuis l'URL pour éviter les valeurs stale
    const currentYear = searchParams.get("year") || year;
    const currentMonth = searchParams.get("month") || month;
    handleSetUrlParameters(
      Number(currentYear),
      Number(currentMonth),
      selectedWeek,
      Number(day)
    );
  };

  const handleMonthChange = (value: string | undefined) => {
    if (value === undefined) return;
    const selectedMonth = !isNaN(Number(value)) ? Number(value) : now.month;
    // Ne pas mettre à jour si c'est déjà la même valeur
    if (selectedMonth === Number(month)) return;
    // Lire l'année directement depuis l'URL pour éviter les valeurs stale
    const currentYear = searchParams.get("year") || year;
    handleSetUrlParameters(
      Number(currentYear),
      selectedMonth,
      Number(week),
      Number(day)
    );
  };

  const handleYearChange = (value: string | undefined) => {
    if (value === undefined) return;
    const selectedYear = !isNaN(Number(value)) ? Number(value) : now.year;
    // Ne pas mettre à jour si c'est déjà la même valeur
    if (selectedYear === Number(year)) return;
    // Lire le mois directement depuis l'URL pour éviter les valeurs stale
    const currentMonth = searchParams.get("month") || month;
    handleSetUrlParameters(
      selectedYear,
      Number(currentMonth),
      Number(week),
      Number(day)
    );
  };

  const onTabChange = (value: string) => {
    if (startTransition) {
      startTransition(() => {
        setPeriod(value);
        // S'assurer que l'année est toujours dans l'URL pour éviter le reset
        if (!searchParams.get("year")) {
          setYear(year);
        }
      });
    } else {
      setPeriod(value);
      // S'assurer que l'année est toujours dans l'URL pour éviter le reset
      if (!searchParams.get("year")) {
        setYear(year);
      }
    }
  };

  const goToPreviousDay = () => {
    const previousDay = selectedDate.minus({ days: 1 });
    handleSetUrlParameters(
      previousDay.year,
      previousDay.month,
      previousDay.weekNumber,
      previousDay.day
    );
  };

  const goToNextDay = () => {
    const nextDay = selectedDate.plus({ days: 1 });
    handleSetUrlParameters(
      nextDay.year,
      nextDay.month,
      nextDay.weekNumber,
      nextDay.day
    );
  };

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
              defaultValue={week}
              value={week}
            />
          </TabsContent>

          <TabsContent value="month" className="w-full md:w-fit mt-0">
            <Select
              className="w-full md:w-fit font-bold md:bg-input text-gray-800"
              options={monthsOptions}
              onChange={handleMonthChange}
              defaultValue={month}
              value={month}
            />
          </TabsContent>

          <Select
            className="w-full md:w-fit font-bold md:bg-input text-gray-800"
            options={years}
            onChange={handleYearChange}
            defaultValue={year}
            value={year}
            placeholder={"Année"}
          />
        </div>
      </Tabs>
    </div>
  );
};
