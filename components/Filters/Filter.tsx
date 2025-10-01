'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useQueryState } from 'nuqs';
import { Select } from '../Select/Select';
import { PiChevronSortVerticalStroke } from '../../icons/PikaIcons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Filter = ({
  queryKey,
  options,
  placeholder,
  defaultValue,
  searchable,
  clearable,
  multi = false,
  maxVisibleItems,
}: {
  queryKey: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: string;
  searchable?: boolean;
  clearable?: boolean;
  multi?: boolean;
  maxVisibleItems?: number;
}) => {
  const [open, setOpen] = React.useState(false);

  // -----------------------
  // SINGLE VALUE MODE
  // -----------------------
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const handleSingleChange = (val: string | undefined) => {
    setValue(val || null);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', '1');
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  // -----------------------
  // MULTI VALUE MODE
  // -----------------------
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramName = `${queryKey}[]`;

  const selectedValues = React.useMemo(() => {
    if (!multi) return [];
    return searchParams?.getAll(paramName).map(String) || [];
  }, [multi, searchParams, paramName]);

  const toggleMultiValue = (val: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    const current = params.getAll(paramName).map(String);
    const isSelected = current.includes(val);
    const next = isSelected
      ? current.filter((v) => v !== val)
      : [...current, val];

    params.delete(paramName);
    next.forEach((v) => params.append(paramName, v));
    params.set('page', '1');

    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  // -----------------------
  // COMMONS
  // -----------------------
  const sortedOptions = [...options].sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  const renderSelectedLabels = () => {
    if (!multi) return null;

    let labels = selectedValues
      .map((val) => options.find((o) => o.value === val)?.label || '')
      .filter(Boolean);

    if (maxVisibleItems && labels.length > maxVisibleItems) {
      const visible = labels.slice(0, maxVisibleItems);
      const hiddenCount = labels.length - maxVisibleItems;
      return (
        <div className='flex gap-1 flex-wrap'>
          {visible.map((lbl, i) => (
            <span
              key={i}
              className='px-2 py-0.5 bg-gray-200 rounded-full text-sm truncate max-w-[100px]'
            >
              {lbl}
            </span>
          ))}
          <span className='px-2 py-0.5 bg-gray-300 rounded-full text-sm'>
            +{hiddenCount}
          </span>
        </div>
      );
    }

    return (
      <div className='flex gap-1 flex-wrap'>
        {labels.map((lbl, i) => (
          <span
            key={i}
            className='px-2 py-0.5 bg-gray-200 rounded-full text-sm truncate max-w-[100px]'
          >
            {lbl}
          </span>
        ))}
      </div>
    );
  };

  // -----------------------
  // SEARCHABLE UI
  // -----------------------
  if (searchable) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-fit gap-2 border-none bg-transparent'
          >
            {multi
              ? selectedValues.length > 0
                ? renderSelectedLabels()
                : placeholder
              : value
                ? options.find((option) => option.value === value)?.label
                : placeholder}
            <PiChevronSortVerticalStroke className='opacity-50 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder={`Rechercher...`} />
            <CommandList>
              <CommandEmpty>Aucun {placeholder} trouvé.</CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => {
                  const isSelected = multi
                    ? selectedValues.includes(option.value)
                    : value === option.value;

                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        multi
                          ? toggleMultiValue(option.value)
                          : handleSingleChange(
                              value === option.value ? undefined : option.value
                            );
                        if (!multi) setOpen(false);
                      }}
                      value={option.label}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          isSelected ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  // -----------------------
  // NON-SEARCHABLE UI
  // -----------------------
  if (multi) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-fit gap-2 border-none bg-transparent'
          >
            {selectedValues.length > 0 ? renderSelectedLabels() : placeholder}
            <PiChevronSortVerticalStroke className='opacity-50 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <div className='flex flex-col max-h-60 overflow-y-auto'>
            {sortedOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100',
                    isSelected && 'bg-gray-100'
                  )}
                  onClick={() => toggleMultiValue(option.value)}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className='ml-auto h-4 w-4' />}
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // -----------------------
  // DEFAULT SINGLE VALUE MODE (non searchable)
  // -----------------------
  return (
    <Select
      onChange={handleSingleChange}
      options={sortedOptions}
      placeholder={placeholder}
      className='w-fit bg-transparent border-none whitespace-nowrap'
      defaultValue={value ?? defaultValue}
      clearable={clearable}
    />
  );
};
