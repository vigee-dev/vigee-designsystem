'use client';

import React from 'react';
import { DateTime } from 'luxon';
import { addDays } from 'date-fns';
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
}: NewDatePickerProps) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const iso = value ?? defaultValue ?? DateTime.now().toISO();
  const dt = DateTime.fromISO(iso!);
  const date = dt.toJSDate();
  const hour = dt.toFormat('HH:mm');

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

  // Fonctions utilisées avec la props withArrow pour changer rapidement de date
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

  return (
    <div
      className={`inline-flex text-sm items-center border rounded-xl px-2 ${displayHour ? 'py-0' : 'py-2'}  ${className}`}
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
                  handlePrev();
                }}
                className='mx-1 transition-colors rounded-full hover:bg-gray-100'
                type='button'
              >
                <PiChevronLeftStroke />
              </button>
            )}
            <span className='mx-2 font-light'>{dt.toFormat('dd/MM/yyyy')}</span>
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
            toDate={maxDate}
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
            className='font-light cursor-pointer tracking-widest p-0 pl-2 bg-transparent border-none'
            placeholder='-- : --'
            tabIndex={0}
            aria-label="Choisir l'heure"
          />
        </div>
      )}
    </div>
  );
};
