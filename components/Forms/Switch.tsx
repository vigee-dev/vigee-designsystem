import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';

import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { Switch as SwitchShadcn } from '../ui/switch';
import { cn } from '../lib/utils';
import { Label } from '../ui/label';
import * as React from 'react';

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  inverted?: boolean;
  icon?: React.ReactNode;
  pending?: boolean;
};

export default function Switch<T extends FieldValues>({
  form,
  label,
  name,
  descr,
  className,
  onChange,
  value,
  children,
  disabled = false,
  inverted = false,
  icon,
  pending = false,
}: Props<T>) {
  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center justify-between py-4 border rounded-xl p-4 gap-2 text-primary bg-white',
            className
          )}
        >
          {icon && (
            <div className='flex flex-row items-center gap-2'>{icon}</div>
          )}
          <div className='space-y-0.5'>
            <FormLabel className='text-base '>
              {children ? children : label}
            </FormLabel>
            <FormDescription>{descr}</FormDescription>
          </div>
          <FormControl>
            <SwitchShadcn
              disabled={disabled || pending}
              checked={inverted ? !field.value : field.value}
              onCheckedChange={(checked) => {
                if (onChange) onChange(inverted ? !checked : checked);
                field.onChange(inverted ? !checked : checked);
              }}
              className='data-[state=unchecked]:bg-slate-200'
            />
          </FormControl>
        </FormItem>
      )}
    />
  ) : (
    <div
      className={cn(
        'flex flex-row items-center justify-between py-4 border rounded-xl p-4 gap-2 text-primary bg-white',
        className
      )}
    >
      <div className='space-y-0.5'>
        {label && <Label className='text-base'>{label}</Label>}
        {descr && (
          <p className={cn('text-sm text-muted-foreground')}>{descr}</p>
        )}
      </div>
      <SwitchShadcn
        disabled={disabled || pending}
        checked={inverted ? !value : value}
        onCheckedChange={onChange}
        className='data-[state=unchecked]:bg-slate-200'
      />
    </div>
  );
}
