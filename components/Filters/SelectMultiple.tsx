// app/components/vigee-designsystem/components/Filters/SelectMultiple.tsx

'use client';
import { useMemo, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge } from '../ui/badge';
import { cn } from '../lib/utils';
import { PiCheckTickSingleStroke } from '../../icons/PikaIcons';

export type SelectMultipleOption = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
};

interface SelectMultipleProps {
  options: SelectMultipleOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  queryKey?: string;
  maxVisibleBadges?: number;
}

export default function SelectMultiple({
  options,
  placeholder = 'Equipements',
  icon,
  queryKey = 'equipments',
  maxVisibleBadges = 3,
}: SelectMultipleProps) {
  const [queryState, setQueryState] = useQueryState(queryKey);

  const allowedValues = options.map((opt) => String(opt.value));

  const selectedValues = useMemo(() => {
    if (!queryState) return [];
    try {
      const arr = JSON.parse(queryState);
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch {
      return queryState.split(',').map((v) => v.trim());
    }
  }, [queryState]);

  useEffect(() => {
    if (!queryState) return;
    const filtered = selectedValues.filter((v) => allowedValues.includes(v));
    if (filtered.length !== selectedValues.length) {
      setQueryState(null);
    }
  }, [queryState, allowedValues.join(','), setQueryState]);

  const toggleValue = (value: string) => {
    let newSelected: string[];
    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter((v) => v !== value);
    } else {
      newSelected = [...selectedValues, value];
    }

    if (newSelected.length > 0) {
      setQueryState(JSON.stringify(newSelected.map(Number)));
    } else {
      setQueryState(null);
    }
  };

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(String(opt.value))
  );

  const visibleBadges = selectedOptions.slice(0, maxVisibleBadges);
  const hasOverflow = selectedOptions.length > maxVisibleBadges;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl border px-3 py-1 cursor-pointer min-w-[120px]',
            selectedOptions.length === 0 && 'text-gray-500'
          )}
        >
          {selectedOptions.length === 0 ? (
            <>
              {icon && <span className='mr-1 flex items-center'>{icon}</span>}
              <span className='text-sm'>{placeholder}</span>
            </>
          ) : (
            <div className='flex gap-2 flex-wrap items-center'>
              {visibleBadges.map((opt) => (
                <Badge
                  key={opt.value}
                  className='bg-gray-200 text-black transition hover:bg-gray-300 cursor-pointer  flex items-center gap-1 rounded-full px-3 py-1'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleValue(String(opt.value));
                  }}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                  <span className='ml-1 cursor-pointer'>&times;</span>
                </Badge>
              ))}
              {hasOverflow && (
                <span className='text-black font-bold text-lg px-2'>...</span>
              )}
            </div>
          )}
          <span className='ml-auto text-lg'>&#9662;</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-56 p-0' align='start'>
        <div className='flex flex-col max-h-60 overflow-y-auto'>
          {options.map((opt) => {
            const isSelected = selectedValues.includes(String(opt.value));
            return (
              <div
                key={opt.value}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100',
                  isSelected && 'bg-gray-100'
                )}
                onClick={() => toggleValue(String(opt.value))}
              >
                <span>{opt.icon}</span>
                <span className='flex-1 truncate'>{opt.label}</span>
                {isSelected && (
                  <span className='text-lg'>
                    <PiCheckTickSingleStroke />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
