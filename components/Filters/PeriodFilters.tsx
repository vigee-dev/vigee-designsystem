"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import { Select } from "../Select/Select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { startOfWeek, format, addDays, set } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PiCalendarDefaultDuoStroke } from "../../icons/PikaIcons";
import { Calendar } from "../ui/calendar";
import { cn } from "../../lib/utils";

interface Props {
  years?: {
    value: string;
    label: string;
  }[];
  day?: boolean;
  week?: boolean;
  month?: boolean;
  year?: boolean;
}

export const PeriodFilters = ({
  years = [
    { label: "Cette année", value: new Date().getFullYear().toString() },
  ],
  day,
  month,
  week,
  year = true,
}: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const searchParams = useSearchParams();
  const [selectedYear, setSelectedYear] = React.useState<string>(
    years[0]?.value
  );

  const pathname = usePathname();
  const { replace } = useRouter();

  function generateWeeks(year: number) {
    const currentMonth = new Date().getMonth();
    let startDate = startOfWeek(new Date(year, currentMonth, 1), {
      weekStartsOn: 1,
    });
    let weeks: { label: string; value: string }[] = []; // Déclaration explicite du type du tableau

    while (startDate.getMonth() === currentMonth) {
      const endDate = addDays(startDate, 6);
      weeks.push({
        label: `${formatDate(startDate)} au ${formatDate(endDate)}`,
        value: formatForURL(startDate),
      });
      startDate = addDays(startDate, 7);
    }
    return weeks;
  }

  function formatDate(date: Date): string {
    return format(date, "EE dd MMMM", { locale: fr });
  }

  function formatForURL(date: Date): string {
    return format(date, "yyy-MM-dd");
  }

  const getStartAndEndOfWeek = (date: Date): [Date, Date] => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    return [start, end];
  };

  const getStartAndEndOfMonth = (date: Date): [Date, Date] => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [start, end];
  };

  const handleDateChange = (start: Date, end: Date) => {
    const params = new URLSearchParams(searchParams);
    params.set("starting_date", formatForURL(start));
    params.set("ending_date", formatForURL(end));
    replace(`${pathname}?${params.toString()}`);
  };

  const [weeks, setWeeks] = useState(() => generateWeeks(Number(selectedYear)));

  const [months, setMonths] = useState(() =>
    [...Array(12)].map((_, i) => {
      const monthStart = new Date(Number(selectedYear), i, 1);
      return {
        label: monthStart.toLocaleString("fr-FR", { month: "long" }),
        value: formatDate(monthStart),
      };
    })
  );

  const handleDay = (date: Date | undefined) => {
    if (date) {
      const start = set(date, { hours: 0, minutes: 0, seconds: 0 });
      const end = set(date, { hours: 23, minutes: 59, seconds: 59 });
      handleDateChange(start, end);
      setDate(date);
    }
  };

  const handleMonthChange = (value: string | undefined) => {
    const selectedMonthStart = new Date(
      Number(selectedYear),
      months.findIndex(m => m.value === value),
      1
    );
    const [start, end] = getStartAndEndOfMonth(selectedMonthStart);
    handleDateChange(start, end);
  };

  return (
    <div>
      <Tabs
        defaultValue="year"
        className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between md:bg-white bg-transparent md:border border-none  items-center"
      >
        <TabsList className="w-full md:w-fit mt-2">
          {day && (
            <TabsTrigger
              className="w-full md:w-fit"
              value="day"
              onClick={() => {
                const startOfDay = new Date();
                const endOfDay = new Date();

                handleDateChange(startOfDay, endOfDay);
              }}
            >
              Jour
            </TabsTrigger>
          )}
          {week && (
            <TabsTrigger
              className="w-full md:w-fit"
              value="week"
              onClick={() => {
                const today = new Date();
                const start = startOfWeek(today, { weekStartsOn: 1 });
                const end = addDays(start, 6);
                handleDateChange(start, end);
              }}
            >
              Hebdo
            </TabsTrigger>
          )}
          {month && (
            <TabsTrigger
              className="w-full md:w-fit"
              value="month"
              onClick={() => {
                const startOfMonth = new Date(
                  Number(selectedYear),
                  new Date().getMonth(),
                  1
                );
                const endOfMonth = new Date(
                  Number(selectedYear),
                  new Date().getMonth() + 1,
                  0
                );
                handleDateChange(startOfMonth, endOfMonth);
              }}
            >
              Mois
            </TabsTrigger>
          )}
          {year && (day || month || week) && (
            <TabsTrigger
              className="w-full md:w-fit"
              value="year"
              onClick={() => {
                const startOfYear = new Date(Number(selectedYear), 0, 1);
                const endOfYear = new Date(Number(selectedYear), 11, 31);
                handleDateChange(startOfYear, endOfYear);
              }}
            >
              Année
            </TabsTrigger>
          )}
        </TabsList>

        <div className="flex flex-col md:flex-row md:gap-2 gap-1 items-center w-full md:w-fit">
          <TabsContent value="day" className="w-full md:w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-fit font-medium bg-white md:bg-input",
                    !date && "text-muted-foreground"
                  )}
                >
                  <PiCalendarDefaultDuoStroke className="mr-2 h-4 w-4 text-primary" />
                  {date ? (
                    format(date, "EEEE dd MMMM", { locale: fr })
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDay}
                  initialFocus
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </TabsContent>
          <TabsContent value="week" className="w-full md:w-fit">
            <Select
              className="w-full md:w-fit"
              options={weeks}
              onChange={(value: string | undefined) => {
                const selectedWeekStart = new Date(value || "");
                const [start, end] = getStartAndEndOfWeek(selectedWeekStart);

                handleDateChange(start, end);
              }}
              defaultValue={
                weeks.find(week => {
                  const [start] = getStartAndEndOfWeek(new Date(week.value));
                  return date && start <= date && date <= addDays(start, 6);
                })?.value
              }
            />
          </TabsContent>
          <TabsContent value="month" className="w-full md:w-fit">
            <Select
              defaultValue={months[new Date().getMonth()].value}
              options={months}
              onChange={handleMonthChange}
              className="w-full md:w-fit bg-white md:bg-input"
            />
          </TabsContent>

          <Select
            className="w-full md:w-auto md:mt-2 bg-white md:bg-input"
            defaultValue={selectedYear}
            onChange={selectedValue => {
              setSelectedYear(selectedValue ?? "");
            }}
            placeholder="Année"
            options={years}
          />
        </div>
      </Tabs>
    </div>
  );
};
