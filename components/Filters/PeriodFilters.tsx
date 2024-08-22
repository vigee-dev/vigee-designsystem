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
import React from "react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { useGlobalTransition } from "../../../../Contexts/GlobalTransitionContext";

const DEFAULT_TZ = process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || 'Europe/Paris'
const DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'fr-FR'

interface WeekOption {
  label: string;
  value: string;
}

export const generateWeekOptions = (year: number, formatString?: string): WeekOption[] => {
  const weeks: WeekOption[] = [];

  let week = 1;
  let dt = DateTime.fromObject({ weekYear: year, weekNumber: week }).setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE);

  while (dt.weekYear === year) {
    const startOfWeek = dt.startOf('week');
    const endOfWeek = dt.endOf('week');

    const label = (() => {
      if (formatString) return `${startOfWeek.toFormat(formatString)} au ${endOfWeek.toFormat(formatString)}`;
      else return `Semaine ${week} du ${startOfWeek.toLocaleString(DateTime.DATE_FULL)} au ${endOfWeek.toLocaleString(DateTime.DATE_FULL)}`;
    })()

    weeks.push({ label, value: week.toString() });

    week++;
    dt = dt.plus({ weeks: 1 });
  }

  return weeks;
}

interface MonthOption {
  label: string
  value: string
}

export const generateMonthOptions = (year: number): MonthOption[] => {
  const months: MonthOption[] = [];

  for (let month = 1; month <= 12; month++) {
    const dt = DateTime.fromObject({ year, month }).setLocale(DEFAULT_LOCALE).setZone(DEFAULT_TZ);


    const label = dt.toFormat('MMM');
    months.push({ label: label.charAt(0).toUpperCase() + label.slice(1), value: month.toString() });
  }

  return months;
};

interface Props {
  years?: {
    value: string;
    label: string;
  }[];
  day?: boolean;
  week?: boolean;
  month?: boolean;
  year?: boolean;
  defaultPeriod?: PeriodFilterViewType;
}

// TODO duplicate with another type from WeekViewFilter, the two components should be the same
type PeriodFilterViewType = "day" | "week" | "month" | "year";

// TODO refactor WeekViewFilters and PeriodFilters together as they go the same thing, redefine it to a big 'Filters' component
export const PeriodFilters = ({ years = [{ label: "Cette année", value: new Date().getFullYear().toString() }], defaultPeriod = "year" }: Props) => {
  const now = DateTime.now().setZone(DEFAULT_LOCALE).setLocale(DEFAULT_LOCALE);
  const searchParams = useSearchParams();
  const { startGlobalTransition } = useGlobalTransition()

  const [period, setPeriod] = useQueryState("period", {
    defaultValue: defaultPeriod,
    shallow: false
  });

  const [week, setWeek] = useQueryState("week", {
    defaultValue: searchParams.get("week") || DateTime.now().setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE).weekNumber.toString(),
    shallow: false
  });
  const [month, setMonth] = useQueryState("month", {
    defaultValue: searchParams.get("month") || DateTime.now().setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE).month.toString(),
    shallow: false
  });
  const [day, setDay] = useQueryState("day", {
    defaultValue: searchParams.get("day") || DateTime.now().setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE).day.toString(),
    shallow: false
  });
  const [year, setYear] = useQueryState("year", {
    defaultValue: searchParams.get("year") || DateTime.now().setZone(DEFAULT_TZ).setLocale(DEFAULT_LOCALE).year.toString(),
    shallow: false
  });

  const weekOptions = generateWeekOptions(Number(year), "EEE dd MMMM");
  const monthsOptions = generateMonthOptions(Number(year));
  const selectedDate = DateTime.fromObject({ year: Number(year), month: Number(month), day: Number(day) }, { zone: DEFAULT_TZ, locale: DEFAULT_LOCALE });

  const handleSetUrlParameters = (year: number, month: number, week: number, day: number) => {
    startGlobalTransition(() => {
      setYear(year.toString());
      setMonth(month.toString());
      setWeek(week.toString());
      setDay(day.toString());
    });
  };

  const handleDayChange = (date: Date | undefined) => {
    if (date) {
      const luxonDate = DateTime.fromJSDate(date, { zone: DEFAULT_TZ }).setLocale(DEFAULT_LOCALE);
      handleSetUrlParameters(luxonDate.year, luxonDate.month, luxonDate.weekNumber, luxonDate.day);
    }
  };

  const handleWeekChange = (value: string | undefined) => {
    const selectedWeek = !isNaN(Number(value)) ? Number(value) : now.weekNumber;
    handleSetUrlParameters(Number(year), Number(month), selectedWeek, Number(day));
  };

  const handleMonthChange = (value: string | undefined) => {
    const selectedMonth = !isNaN(Number(value)) ? Number(value) : now.month;
    handleSetUrlParameters(Number(year), selectedMonth, Number(week), Number(day));
  };

  const handleYearChange = (value: string | undefined) => {
    const selecterYear = !isNaN(Number(value)) ? Number(value) : now.year;
    handleSetUrlParameters(selecterYear, Number(month), Number(week), Number(day));
  };

  const onTabChange = (value: string) => {
    startGlobalTransition(() => setPeriod(value))
  };

  return (
    <div>
      <Tabs
        value={period}
        className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between bg-transparent md:border border-none items-center bg-white md:bg-transparent  md:p-1 rounded-xl "
        onValueChange={onTabChange}>
        <div className="gap-4 flex items-center w-full">
          <TabsList className="w-full md:w-fit">
            {day && <TabsTrigger className="w-full md:w-fit" value="day">Jour</TabsTrigger>}
            {week && <TabsTrigger className="w-full md:w-fit" value="week">Hebdo</TabsTrigger>}
            {month && <TabsTrigger className="w-full md:w-fit" value="month">Mois</TabsTrigger>}
            {year && (day || month || week) && <TabsTrigger className="w-full md:w-fit" value="year">Année</TabsTrigger>}
          </TabsList>

        </div>

        <div className="flex flex-col md:flex-row md:gap-2 gap-2 items-center w-full md:w-fit pt-2 md:pt-0">
          <TabsContent value="day" className="w-full md:w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full md:w-fit md:bg-input font-bold text-gray-800 -mt-2")}>
                  <PiCalendarDefaultDuoStroke className="mr-2 h-4 w-4 " />
                  {selectedDate.toLocaleString({ day: "numeric", month: "long", year: "numeric" })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" initialFocus locale={fr} defaultMonth={selectedDate.toJSDate()} selected={selectedDate.toJSDate()} onSelect={handleDayChange} />
              </PopoverContent>
            </Popover>
          </TabsContent>

          <TabsContent value="week" className="w-full md:w-fit mt-0">
            <Select className="w-full md:w-fit font-bold md:bg-input text-gray-800" options={weekOptions} onChange={handleWeekChange} defaultValue={week} value={week} />
          </TabsContent>

          <TabsContent value="month" className="w-full md:w-fit mt-0">
            <Select className="w-full md:w-fit font-bold md:bg-input text-gray-800" options={monthsOptions} onChange={handleMonthChange} defaultValue={month} value={month} />
          </TabsContent>

          <Select className="w-full md:w-fit font-bold md:bg-input text-gray-800" options={years} onChange={handleYearChange} defaultValue={year} value={year} placeholder={"Année"} />
        </div>
      </Tabs>
    </div>
  );
};
