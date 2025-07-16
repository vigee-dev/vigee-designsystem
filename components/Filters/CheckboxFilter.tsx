'use client';
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useQueryState } from 'nuqs';

interface CheckboxFilterProps {
  queryKey: string;
  label: string;
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckboxFilter = ({
  queryKey,
  label,
  className,
  defaultChecked = false,
  onChange,
}: CheckboxFilterProps) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const checked = value === 'true' || (value == null && defaultChecked);

  const handleCheckedChange = (checked: boolean) => {
    setValue(checked ? 'true' : 'false');
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label
      className={cn('inline-flex items-center gap-2 cursor-pointer', className)}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={handleCheckedChange}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
        )}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className='h-4 w-4' />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className='text-sm'>{label}</span>
    </label>
  );
};
