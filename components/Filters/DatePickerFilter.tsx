'use client';

import React, { useEffect } from 'react';
import { DateTime } from 'luxon';
import { addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useQueryState } from 'nuqs';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Input as ShadInput } from '../ui/input';
import {
  PiCalendarFilledStroke,
  PiChevronLeftStroke,
  PiChevronRightStroke,
  PiClockDefaultStroke,
} from '../../icons/PikaIcons';

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
}

export const DatePickerFilter = ({
  label,
  withArrows,
  className = '',
  defaultValue,
  displayHour = false,
  queryKey = 'start_date',
  minDate,
  maxDate,
  canChoosePastDay = false,
}: NewDatePickerProps) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const iso = value ?? defaultValue ?? DateTime.now().toISO();
  const dt = DateTime.fromISO(iso!);
  const isValidDate = dt.isValid;

  // Utilisé pour mettre la date d'aujourd'hui en valeur si l'utilisateur tape une fausse date dans l'url, car l'url et la valeur de ce composant sont connectées =>  Permet d'avoir une UX propre pour l'utilisateur.
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
        resetTo = DateTime.fromJSDate(minDate).toISO();
      }
      if (maxDate && dt > DateTime.fromJSDate(maxDate)) {
        shouldReset = true;
        resetTo = DateTime.now().toISO();
      }
    }
    if (shouldReset && resetTo) {
      setValue(resetTo);
    }
  }, [value, isValidDate, setValue, minDate, maxDate, dt]);

  const displayIso = isValidDate ? iso : DateTime.now().toISO();
  const displayDt = DateTime.fromISO(displayIso!);
  const date = displayDt.toJSDate();
  const hour = displayDt.toFormat('HH:mm');

  const handleDateChange = (selected?: Date) => {
    if (selected) {
      const newIso = DateTime.fromJSDate(selected)
        .set({
          hour: Number(hour.split(':')[0]),
          minute: Number(hour.split(':')[1]),
        })
        .toISO();
      setValue(newIso!);
    }
  };
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m] = e.target.value.split(':');
    const newIso = DateTime.fromJSDate(date)
      .set({ hour: Number(h), minute: Number(m) })
      .toISO();
    setValue(newIso!);
  };

  const handlePrev = () => {
    const newDate = addDays(date, -1);
    const newIso = DateTime.fromJSDate(newDate)
      .set({
        hour: Number(hour.split(':')[0]),
        minute: Number(hour.split(':')[1]),
      })
      .toISO();
    setValue(newIso!);
  };
  const handleNext = () => {
    const newDate = addDays(date, 1);
    const newIso = DateTime.fromJSDate(newDate)
      .set({
        hour: Number(hour.split(':')[0]),
        minute: Number(hour.split(':')[1]),
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
      className={`inline-flex text-sm items-center border rounded-xl px-2 ${displayHour ? 'py-0' : 'py-1'}  ${className}`}
    >
      {label && (
        <span className='mr-4 font-light flex items-center h-full'>
          {label}
        </span>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <div className='inline-flex items-center cursor-pointer'>
            <PiCalendarFilledStroke className='w-5 h-5' />
            {withArrows && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isPrevDisabled) handlePrev();
                }}
                className={`mx-1 transition-colors rounded-full ${isPrevDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                type='button'
                disabled={isPrevDisabled}
                tabIndex={isPrevDisabled ? -1 : 0}
                aria-disabled={isPrevDisabled}
              >
                <PiChevronLeftStroke />
              </button>
            )}
            <span className='mx-2 font-light'>
              {displayDt.toFormat('dd/MM/yyyy')}
            </span>
            {withArrows && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className='mx-1 transition-colors rounded-full hover:bg-gray-100'
                type='button'
              >
                <PiChevronRightStroke />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-auto p-2'>
          <Calendar
            mode='single'
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
        <div className='relative flex items-center justify-center ml-4'>
          <PiClockDefaultStroke className='w-6 h-6 ' />
          <ShadInput
            type='time'
            value={hour}
            onChange={handleHourChange}
            className='font-light cursor-pointer tracking-widest p-0 pl-2 bg-transparent border-none hover:bg-gray-200 transition'
            placeholder='-- : --'
            tabIndex={0}
            aria-label="Choisir l'heure"
          />
        </div>
      )}
    </div>
  );
};
