"use client";

import { useEffect } from "react";
import { DateTime } from "luxon";
import { addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useQueryState } from "nuqs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  PiCalendarFilledStroke,
  PiChevronLeftStroke,
  PiChevronRightStroke,
  PiClockDefaultStroke,
} from "../../icons/PikaIcons";

interface NewDatePickerProps {
  label?: string;
  withArrows?: boolean;
  className?: string;
  defaultValue?: string;
  displayHour?: boolean;
  queryKey?: string;
  minDate?: Date;
  maxDate?: Date;
  canChoosePastDay?: boolean;
  minHour?: string;
  maxHour?: string;
}

export const DatePickerFilter = ({
  label,
  withArrows,
  className = "",
  defaultValue,
  displayHour = false,
  queryKey = "start_date",
  minDate,
  maxDate,
  canChoosePastDay = false,
  minHour,
  maxHour,
}: NewDatePickerProps) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const iso = value ?? defaultValue ?? DateTime.now().toISO();
  const dt = DateTime.fromISO(iso!);
  const isValidDate = dt.isValid;

  useEffect(() => {
    let shouldReset = false;
    let resetTo: string | null = null;
    if (value && !isValidDate) {
      shouldReset = true;
      resetTo = minDate
        ? DateTime.fromJSDate(minDate).toISO()
        : DateTime.now().toISO();
    }

    if (isValidDate) {
      if (minDate && dt < DateTime.fromJSDate(minDate)) {
        shouldReset = true;
        resetTo = DateTime.fromJSDate(minDate)
          .set({
            hour: dt.hour,
            minute: dt.minute,
          })
          .toISO();
      }
      if (maxDate && dt > DateTime.fromJSDate(maxDate)) {
        shouldReset = true;
        resetTo = DateTime.fromJSDate(maxDate)
          .set({
            hour: dt.hour,
            minute: dt.minute,
          })
          .toISO();
      }
    }
    if (shouldReset && resetTo) {
      setValue(resetTo);
    }
  }, [value, isValidDate, setValue, minDate, maxDate, dt]);

  const displayIso = isValidDate ? iso : DateTime.now().toISO();
  const displayDt = DateTime.fromISO(displayIso!);
  const date = displayDt.toJSDate();
  const hour = displayDt.toFormat("HH:mm");

  const timeOptions: Array<{ value: string; disabled: boolean }> = [];
  const now = DateTime.now();

  const isValidMinHour = minHour && /^\d{2}:\d{2}$/.test(minHour);
  const isValidMaxHour = maxHour && /^\d{2}:\d{2}$/.test(maxHour);

  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const timeString = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

      let isInRange = true;

      if (isValidMinHour) {
        const [minH, minM] = minHour.split(":").map(Number);
        const currentMinutes = h * 60 + m;
        const minMinutes = minH * 60 + minM;
        isInRange = isInRange && currentMinutes >= minMinutes;
      }

      if (isValidMaxHour) {
        const [maxH, maxM] = maxHour.split(":").map(Number);
        const currentMinutes = h * 60 + m;
        const maxMinutes = maxH * 60 + maxM;
        isInRange = isInRange && currentMinutes <= maxMinutes;
      }

      const timeDateTime = DateTime.fromJSDate(date).set({
        hour: h,
        minute: m,
      });
      const isPast =
        timeDateTime <= now && DateTime.fromJSDate(date).hasSame(now, "day");

      if (isInRange && !isPast) {
        timeOptions.push({
          value: timeString,
          disabled: false,
        });
      }
    }
  }

  useEffect(() => {
    if (isValidDate && displayHour) {
      const isToday = DateTime.fromJSDate(date).hasSame(now, "day");
      const currentHourString = displayDt.toFormat("HH:mm");
      const isHourValid = timeOptions.some(
        (option) => option.value === currentHourString
      );

      if (isToday && !isHourValid && timeOptions.length > 0) {
        const firstAvailableHour = timeOptions[0].value;
        const [newHour, newMinute] = firstAvailableHour.split(":").map(Number);
        const correctedDateTime = DateTime.fromJSDate(date)
          .set({ hour: newHour, minute: newMinute })
          .toISO();
        setValue(correctedDateTime);
      }
    }
  }, [isValidDate, displayDt, displayHour, timeOptions, now, date, setValue]);

  const handleDateChange = (selected?: Date) => {
    if (selected) {
      const newIso = DateTime.fromJSDate(selected)
        .set({
          hour: Number(hour.split(":")[0]),
          minute: Number(hour.split(":")[1]),
        })
        .toISO();
      setValue(newIso!);
    }
  };

  const handleTimeChange = (selectedTime: string) => {
    const [h, m] = selectedTime.split(":");
    const newIso = DateTime.fromJSDate(date)
      .set({ hour: Number(h), minute: Number(m) })
      .toISO();
    setValue(newIso!);
  };

  const handlePrev = () => {
    const newDate = addDays(date, -1);
    const newIso = DateTime.fromJSDate(newDate)
      .set({
        hour: Number(hour.split(":")[0]),
        minute: Number(hour.split(":")[1]),
      })
      .toISO();
    setValue(newIso!);
  };

  const handleNext = () => {
    const newDate = addDays(date, 1);
    const newIso = DateTime.fromJSDate(newDate)
      .set({
        hour: Number(hour.split(":")[0]),
        minute: Number(hour.split(":")[1]),
      })
      .toISO();
    setValue(newIso!);
  };

  const prevDate = addDays(date, -1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  prevDate.setHours(0, 0, 0, 0);
  const isPrevDisabled = !canChoosePastDay && prevDate < today;

  const maxDateExclusive = maxDate
    ? new Date(maxDate.getTime() - 24 * 60 * 60 * 1000)
    : undefined;

  return (
    <div
      className={`inline-flex text-sm items-center border rounded-xl px-2 ${displayHour ? "py-0" : "py-1"}  ${className}`}
    >
      {label && (
        <span className="mr-4 font-light flex items-center h-full">
          {label}
        </span>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <div className="inline-flex items-center cursor-pointer">
            <PiCalendarFilledStroke className="w-5 h-5" />
            {withArrows && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isPrevDisabled) handlePrev();
                }}
                className={`mx-1 transition-colors rounded-full ${isPrevDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}
                type="button"
                disabled={isPrevDisabled}
                tabIndex={isPrevDisabled ? -1 : 0}
                aria-disabled={isPrevDisabled}
              >
                <PiChevronLeftStroke />
              </button>
            )}
            <span className="mx-2 font-light">
              {displayDt.toFormat("dd/MM/yyyy")}
            </span>
            {withArrows && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="mx-1 transition-colors rounded-full hover:bg-gray-100"
                type="button"
              >
                <PiChevronRightStroke />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            fromDate={minDate}
            locale={fr}
            disabled={
              maxDateExclusive ? { after: maxDateExclusive } : undefined
            }
          />
        </PopoverContent>
      </Popover>

      {displayHour && (
        <div className="relative flex items-center justify-center ml-4 ">
          <PiClockDefaultStroke className="w-6 h-6 mr-2" />
          <Select value={hour} onValueChange={handleTimeChange}>
            <SelectTrigger
              aria-placeholder="HH:mm"
              className="w-20 h-8 text-sm font-light border-none bg-transparent hover:bg-slate-200 transition focus:outline-none focus:ring-0 focus:ring-offset-0 focus:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-transparent active:bg-transparent focus:bg-none outline-none ring-0 ring-offset-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent arrowPadding={5} className="max-h-48">
              {timeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
