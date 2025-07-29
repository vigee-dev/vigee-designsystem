// import React from 'react';
// import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
// import { Container } from '../Container/Container';
// import {
//   ToggleGroup as ShadToggleGroup,
//   ToggleGroupItem,
// } from '../ui/toggle-group';
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
// } from '../ui/form';
// import { cn } from '../lib/utils';
// import { Label } from '../ui/label';

// type Option = {
//   label?: string;
//   value: string;
//   icon?: React.ReactNode;
//   description?: string;
//   disabled?: boolean;
// };

// type Props<T extends FieldValues> = {
//   form: UseFormReturn<T>;
//   name: Path<T>;
//   label?: string;
//   descr?: string;
//   className?: string;
//   optionsClassName?: string;
//   disabled?: boolean;
//   options: Option[];
//   nowrap?: boolean;
// };

// export const Toggles = <T extends FieldValues>({
//   form,
//   name,
//   label,
//   descr,
//   className,
//   optionsClassName,
//   disabled,
//   options,
//   nowrap = false,
// }: Props<T>) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className='w-full col-span-full'>
//           {label && <Label className='font-bold'>{label}</Label>}
//           <FormControl>
//             <Container className={cn('p-1', className)}>
//               <ShadToggleGroup
//                 type='single'
//                 className={`w-full flex flex-col md:flex-row  ${!nowrap && 'flex-wrap'}`}
//                 value={field.value}
//                 onValueChange={field.onChange}
//                 disabled={disabled}
//               >
//                 {options.map((option) => (
//                   <ToggleGroupItem
//                     key={option.value}
//                     value={option.value}
//                     aria-label={option.label || ''}
//                     disabled={option.disabled}
//                     className={cn(
//                       ' items-center h-fit p-4 flex justify-between w-full gap-6 md:px-6 rounded-lg  border-none',
//                       optionsClassName
//                     )}
//                   >
//                     <div className='w-fit'>{option.icon}</div>
//                     {(option.label || option.description) && (
//                       <div className='w-full text-left '>
//                         {option.label && (
//                           <span className='text-md font-bold '>
//                             {option.label}
//                           </span>
//                         )}
//                         {option.description && (
//                           <p className='text-xs text-gray-500'>
//                             {option.description}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </ToggleGroupItem>
//                 ))}
//               </ShadToggleGroup>
//             </Container>
//           </FormControl>
//           {descr && <FormDescription>{descr}</FormDescription>}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// Ancien Toggle de main-old-14 au dessus et nouveau en dessous pour utiliser les checkobox dans le form de creation de salles
import { motion } from 'framer-motion';
import React from 'react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { PiCheckTickSquareDuoSolid } from '../../icons/PikaIcons';
import { Container } from '../Container/Container';
import { cn } from '../lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Label } from '../ui/label';
import {
  ToggleGroup as ShadToggleGroup,
  ToggleGroupItem,
} from '../ui/toggle-group';

type Option = {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
};

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  descr?: string;
  className?: string;
  optionsClassName?: string;
  disabled?: boolean;
  options: Option[];
  nowrap?: boolean;
  multi?: boolean;
  columns?: number;
  variant?: 'default' | 'small';
  onChange?: (value: string) => void;
  withCheckbox?: boolean;
};

export const Toggles = <T extends FieldValues>({
  form,
  name,
  label,
  descr,
  className,
  optionsClassName,
  disabled,
  options,
  nowrap = false,
  multi = false,
  variant = 'default',
  onChange,
  withCheckbox = false,
  columns,
}: Props<T>) => {
  const handleValueChange = React.useCallback(
    (value: string | string[]) => {
      // @ts-ignore
      form.setValue(name, value as PathValue<T, Path<T>>);
      if (onChange && typeof value === 'string') {
        onChange(value);
      }
    },
    [form, name, onChange]
  );

  // Force la valeur par défaut si le champ est vide
  React.useEffect(() => {
    const current = form.getValues(name);
    if (!current && options.length > 0) {
      // @ts-ignore
      form.setValue(name, options[0].value as PathValue<T, Path<T>>);
    }
  }, [form, name, options]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const isNowrap = !!nowrap;
        const gridColsClass = !isNowrap ? `grid-cols-${options.length}` : '';
        return (
          <FormItem className='w-full col-span-full'>
            {label && <Label className='font-bold'>{label}</Label>}
            <FormControl>
              <Container
                className={cn(
                  'p-1',
                  className,
                  variant === 'small' && 'border-none'
                )}
              >
                <ShadToggleGroup
                  type={multi ? 'multiple' : 'single'}
                  className={cn(
                    'w-full gap-2',
                    columns
                      ? `grid grid-cols-1 md:grid-cols-${columns}`
                      : isNowrap
                        ? 'flex md:flex-row flex-col'
                        : 'flex flex-col',
                    variant === 'small' && 'border-none w-full'
                  )}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  {options.map((option) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0.8, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={cn('h-full w-full', isNowrap && 'flex-1')}
                    >
                      <ToggleGroupItem
                        value={option.value}
                        aria-label={option.label || ''}
                        disabled={option.disabled}
                        className={cn(
                          'items-center h-full w-full flex-1 p-4 flex justify-between gap-4 md:px-6 rounded-lg border-none data-[state=on]:bg-input hover:bg-input',
                          optionsClassName,
                          variant === 'small' &&
                            'rounded-full border-none p-1 gap-0 justify-center  data-[state=on]:bg-primary data-[state=on]:text-white md:px-0'
                        )}
                      >
                        <div className='flex items-center w-full gap-4'>
                          <div>{option.icon}</div>
                          {(option.label || option.description) && (
                            <div className='w-full text-left'>
                              {option.label && (
                                <span className='text-md font-bold'>
                                  {option.label}
                                </span>
                              )}
                              {option.description && (
                                <p className='text-xs text-gray-500'>
                                  {option.description}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                        {withCheckbox &&
                          (multi
                            ? Array.isArray(field.value) &&
                              field.value.includes(option.value)
                            : field.value === option.value) && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                              className='ml-2'
                            >
                              <PiCheckTickSquareDuoSolid className='text-success-foreground' />
                            </motion.div>
                          )}
                      </ToggleGroupItem>
                    </motion.div>
                  ))}
                </ShadToggleGroup>
              </Container>
            </FormControl>
            {descr && <FormDescription>{descr}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
