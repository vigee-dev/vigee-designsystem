"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useQueryState } from "nuqs";
import { Select } from "../Select/Select";
import { useState, useEffect } from "react";
import { startOfWeek, format, addDays, set } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PiCalendarDefaultDuoStroke } from "../../icons/PikaIcons";
import { Calendar } from "../ui/calendar";
import { cn } from "../lib/utils";

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
  const [startDate, setStartDate] = useQueryState("starting_date", {
    defaultValue: "",
    shallow: false,
  });
  const [endDate, setEndDate] = useQueryState("ending_date", {
    defaultValue: "",
    shallow: false,
  });
  const [selectedYear, setSelectedYear] = useQueryState("year", {
    defaultValue: years[0].value,
    shallow: false,
  });
  const defaultDate = ((): Date => {
    const date = new Date();
    date.setFullYear(Number(selectedYear));
    return date;
  })();

  const [date, setDate] = useState<Date | undefined>(defaultDate);

  useEffect(() => {
    const startOfYear = new Date(Number(selectedYear), 0, 1);
    const endOfYear = new Date(Number(selectedYear), 11, 31);
    handleDateChange(startOfYear, endOfYear);
  }, [selectedYear]);

  function generateWeeks(year: number) {
    let startDate = startOfWeek(new Date(year, 0, 1), {
      weekStartsOn: 1,
    });

    let weeks: { label: string; value: string }[] = [];

    while (startDate.getFullYear() === year) {
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
    setStartDate(formatForURL(start));
    setEndDate(formatForURL(end));
  };

  const handleYearChange = (year: string) => {
    if (startDate && endDate) {
      const startingDate = new Date(startDate);
      const endingDate = new Date(endDate);
      startingDate.setFullYear(Number(year));
      endingDate.setFullYear(Number(year));
      handleDateChange(startingDate, endingDate);
    }
    setSelectedYear(year);
  };

  const [weeks, setWeeks] = useState(generateWeeks(Number(selectedYear)));

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
      date.setFullYear(Number(selectedYear));
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

  const [tab, setTab] = useState("year");

  const onTabChange = (value: string) => {
    setTab(value);

    if (value === "year") {
      const startOfYear = new Date(Number(selectedYear), 0, 1);
      const endOfYear = new Date(Number(selectedYear), 11, 31);
      handleDateChange(startOfYear, endOfYear);
    } else if (value === "month") {
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
    } else if (value === "week") {
      const today = new Date();
      const start = startOfWeek(today, { weekStartsOn: 1 });
      const end = addDays(start, 6);
      selectedYear && start.setFullYear(Number(selectedYear));
      selectedYear && end.setFullYear(Number(selectedYear));
      handleDateChange(start, end);
    } else if (value === "day") {
      const startOfDay = new Date();
      selectedYear && startOfDay.setFullYear(Number(selectedYear));
      const endOfDay = new Date();
      selectedYear && endOfDay.setFullYear(Number(selectedYear));
      handleDateChange(startOfDay, endOfDay);
    }
  };

  return (
    <div>
      <Tabs
        value={tab}
        className="flex flex-col md:flex-row gap-1 md:gap-4 justify-between bg-transparent md:border border-none items-center bg-white md:bg-transparent p-4 md:p-1 rounded-xl "
        onValueChange={onTabChange}
      >
        <TabsList className="w-full md:w-fit">
          {day && (
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

        <div className="flex flex-col md:flex-row md:gap-2 gap-2 items-center w-full md:w-fit pt-2 md:pt-0">
          <TabsContent value="day" className="w-full md:w-fit">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-fit md:bg-input font-bold text-gray-800 -mt-2",
                    !date && "text-muted-foreground "
                  )}
                >
                  <PiCalendarDefaultDuoStroke className="mr-2 h-4 w-4 " />
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
          <TabsContent value="week" className="w-full md:w-fit mt-0">
            <Select
              className="w-full md:w-fit font-bold md:bg-input text-gray-800"
              options={weeks}
              onChange={(value: string | undefined) => {
                const selectedWeekStart = new Date(value || "");
                const [start, end] = getStartAndEndOfWeek(selectedWeekStart);
                selectedYear && start.setFullYear(Number(selectedYear));
                selectedYear && end.setFullYear(Number(selectedYear));
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
          <TabsContent value="month" className="w-full md:w-fit mt-0">
            <Select
              defaultValue={months[new Date().getMonth()].value}
              options={months}
              onChange={handleMonthChange}
              className="w-full md:w-fit font-bold md:bg-input text-gray-800"
            />
          </TabsContent>

          <Select
            className="w-full md:w-fit font-bold md:bg-input text-gray-800"
            defaultValue={selectedYear}
            onChange={selectedValue => {
              handleYearChange(selectedValue ?? "");
            }}
            placeholder="Année"
            options={years}
          />
        </div>
      </Tabs>
    </div>
  );
};
