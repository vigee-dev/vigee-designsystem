'use client';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { PiQuestionMarkCircleDuoStroke } from '../../icons/PikaIcons';
import { cn } from '../lib/utils';
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  id?: string;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  count?: boolean;
  max?: number;
  descr?: string;
  defaultValue?: string;
  className?: string;
  minHeight?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  helpComponent?: React.ReactNode;
  rows?: number;
  white?: boolean;
  fullWidth?: boolean;
  rezizable?: boolean;
  'data-testid'?: string;
};

export default function TextArea<T extends FieldValues>({
  form,
  name,
  required,
  label,
  placeholder,
  max,
  onBlur,
  className,
  descr,
  disabled,
  helpComponent,
  rows = 3,
  white,
  fullWidth,
  rezizable,
  'data-testid': dataTestId,
}: Props<T>) {
  const [charCount, setCharCount] = useState(
    name ? form?.getValues(name)?.length || 0 : 0
  );

  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={cn(fullWidth && 'col-span-full')}>
          <HoverCard>
            <div className='flex items-center justify-between'>
              {label && (
                <FormLabel className='font-black text-primary mt-2 flex items-center gap-2'>
                  {label}
                  {required && <span className='text-red-600 ml-1'>*</span>}
                  {max && (
                    <div className='text-gray-500 text-xs font-medium'>
                      {charCount}
                      {max && `/ ${max}`}
                    </div>
                  )}
                </FormLabel>
              )}
              {helpComponent && (
                <HoverCardTrigger>
                  <PiQuestionMarkCircleDuoStroke className='w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400' />
                </HoverCardTrigger>
              )}
            </div>
            <div className='flex items-center justify-between mt-2'>
              <div>
                {helpComponent && (
                  <HoverCardContent>
                    <div className='p-2'>{helpComponent}</div>
                  </HoverCardContent>
                )}
              </div>
            </div>
          </HoverCard>
          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder ?? ''}
            onBlur={onBlur ? onBlur : field.onBlur}
            onChange={(e) => {
              if (max) {
                setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
              }
              field.onChange(e);
            }}
            className={cn(
              ` font-medium bg-input border-none text-[16px] md:text-sm col-span-full font-sans`,
              white && 'bg-white border border-zinc-200 border-solid',
              className,
              rezizable ? 'resize-vertical' : 'resize-none'
            )}
            disabled={disabled}
            data-testid={dataTestId || (name ? `textarea-${name}` : undefined)}
          />
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
