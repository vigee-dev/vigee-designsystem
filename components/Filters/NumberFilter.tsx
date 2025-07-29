'use client';
import * as React from 'react';
import { cn } from '../lib/utils';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

interface NumberFilterProps {
  queryKey: string;
  icon?: React.ReactNode;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  placeholder?: string;
  defaultValue?: number;
}

export const NumberFilter = ({
  queryKey,
  icon,
  min,
  max,
  step = 1,
  className,
  placeholder,
  defaultValue = 0,
}: NumberFilterProps) => {
  const safeDefault =
    typeof defaultValue === 'number' && !isNaN(defaultValue) ? defaultValue : 0;

  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const parsed = Number(value);
  const isValid =
    value !== null &&
    value !== undefined &&
    value !== '' &&
    !isNaN(parsed) &&
    (min === undefined || parsed >= min) &&
    (max === undefined || parsed <= max);

  useEffect(() => {
    if (value && !isValid) {
      setValue(String(safeDefault));
    }
  }, [value, isValid, setValue, safeDefault]);

  const numValue = isValid ? parsed : safeDefault;

  return (
    <div className={cn('flex items-center', className)}>
      {icon && <span className='mr-1 flex items-center'>{icon}</span>}
      <input
        type='number'
        value={numValue}
        onChange={(e) => setValue(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={cn(
          'px-2 py-1 bg-transparent border-none focus:outline-none',
          icon ? 'pl-2' : ''
        )}
      />
    </div>
  );
};
