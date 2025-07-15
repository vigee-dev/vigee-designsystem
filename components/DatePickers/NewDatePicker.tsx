import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { addDays } from 'date-fns';
import {
  PiCalendarFilledStroke,
  PiClockDefaultStroke,
} from '../../icons/PikaIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import Input from '../Forms/Input';
import { cn } from '../lib/utils';
import { Input as ShadInput } from '../ui/input';
import { FormControl, FormField, FormItem } from '../ui/form';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

interface NewDatePickerProps<T extends FieldValues = any> {
  label?: string;
  withArrows?: boolean;
  className?: string;
  onChange?: (value: { iso: string }) => void;
  initialDate?: Date;
  initialHour?: string;
  form?: UseFormReturn<T>;
  name?: Path<T>;
}

const NewDatePicker = <T extends FieldValues = any>({
  label,
  withArrows,
  className = '',
  onChange,
  initialDate,
  initialHour,
  form,
  name,
}: NewDatePickerProps<T>) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>(initialDate || new Date());
  const [hour, setHour] = useState<string>(initialHour || '');

  const getIsoString = (date: Date, hour: string): string => {
    if (!date || !hour || hour.length !== 5) return '';
    const [h, m] = hour.split(':');
    const dt = DateTime.fromJSDate(date).set({
      hour: Number(h),
      minute: Number(m),
      second: 0,
      millisecond: 0,
    });
    return dt.toUTC().toISO() || '';
  };

  const handlePrev = () => {
    setDate((prev) => {
      const newDate = addDays(prev, -1);
      const iso = getIsoString(newDate, hour);
      if (form && name)
        form.setValue(
          name,
          iso as unknown as import('react-hook-form').PathValue<T, Path<T>>,
          { shouldValidate: true }
        );
      if (onChange) onChange({ iso });
      return newDate;
    });
  };
  const handleNext = () => {
    setDate((prev) => {
      const newDate = addDays(prev, 1);
      const iso = getIsoString(newDate, hour);
      if (form && name)
        form.setValue(
          name,
          iso as unknown as import('react-hook-form').PathValue<T, Path<T>>,
          { shouldValidate: true }
        );
      if (onChange) onChange({ iso });
      return newDate;
    });
  };
  const handleDateChange = (selected?: Date) => {
    if (selected) {
      setDate(selected);
      const iso = getIsoString(selected, hour);
      if (form && name)
        form.setValue(
          name,
          iso as unknown as import('react-hook-form').PathValue<T, Path<T>>,
          { shouldValidate: true }
        );
      if (onChange) onChange({ iso });
    }
  };
  const handleHourChange = (value: string) => {
    setHour(value);
    const iso = getIsoString(date, value);
    if (form && name)
      form.setValue(
        name,
        iso as unknown as import('react-hook-form').PathValue<T, Path<T>>,
        { shouldValidate: true }
      );
    if (onChange) onChange({ iso });
  };

  return (
    <div
      className={`inline-flex items-center border rounded-xl px-2  ${className}`}
    >
      {label && (
        <span className='mr-4 font-light flex items-center h-full'>
          {label}
        </span>
      )}
      {/* Partie date avec popover */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className='inline-flex items-center cursor-pointer'
            onClick={() => setOpen(true)}
          >
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
                <ChevronLeft />
              </button>
            )}
            <span className='mx-2 font-light'>
              {DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')}
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
                <ChevronRight />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-auto p-2'>
          <Calendar mode='single' selected={date} onSelect={handleDateChange} />
        </PopoverContent>
      </Popover>
      {/* Partie horaire indépendante */}
      <div className='relative flex items-center ml-4'>
        <PiClockDefaultStroke className='w-5 h-5 ' />
        {form && name ? (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='relative'>
                    <ShadInput
                      type='time'
                      value={hour}
                      onChange={(e) => handleHourChange(e.target.value)}
                      className={cn(
                        'w-[90px] font-light text-lg tracking-widest pr-2 bg-transparent border-none no-time-indicator',
                        !(hour && hour.length > 0) &&
                          'text-transparent caret-transparent'
                      )}
                      placeholder='-- : --'
                      tabIndex={0}
                      aria-label="Choisir l'heure"
                    />
                    {!(hour && hour.length > 0) && (
                      <span
                        className='absolute left-0 top-0 w-[90px] h-full flex items-center pl-3 font-light text-lg tracking-widest text-black pointer-events-none'
                        style={{ pointerEvents: 'none' }}
                      >
                        -- : --
                      </span>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div className='relative'>
            <ShadInput
              type='time'
              value={hour}
              onChange={(e) => handleHourChange(e.target.value)}
              className={cn(
                'w-[90px] font-light text-lg tracking-widest pr-2 bg-transparent border-none no-time-indicator',
                'focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-none focus-visible:border-none',
                !(hour && hour.length > 0) &&
                  'text-transparent caret-transparent'
              )}
              placeholder='-- : --'
              tabIndex={0}
              aria-label="Choisir l'heure"
            />
            {!(hour && hour.length > 0) && (
              <span
                className='absolute left-0 top-0 w-[90px] h-full flex items-center pl-3 font-light text-lg tracking-widest text-black pointer-events-none'
                style={{ pointerEvents: 'none' }}
              >
                -- : --
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDatePicker;
