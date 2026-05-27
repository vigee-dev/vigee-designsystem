/**
 * @description Sélecteur exclusif compact (style "pill segmented") intégré react-hook-form ou contrôlé manuellement. Idéal pour 2 à 4 options courtes à choisir d'un coup d'œil.
 * @useWhen choix exclusif rapide entre 2-4 options textuelles courtes dans un formulaire RHF → utiliser avec `form` + `name` | toggle de mode (ex: "Moi" / "Au nom du client", "Mensuel" / "Annuel") hors formulaire → utiliser avec `value` + `onValueChange` | filtrage rapide d'une vue (ex: "Tous" / "Actifs" / "Archivés")
 * @dontUseFor liste longue ou texte des options > ~20 caractères → utiliser Select | choix multiple → utiliser Checkboxes ou Toggles avec multi | toggle binaire booléen sans label par état → utiliser Switch
 * @example <SegmentedControl form={form} name="period" label="Période" options={[{ value: "monthly", label: "Mensuel" }, { value: "yearly", label: "Annuel" }]} />
 */
import * as React from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { cn } from '../lib/utils';
import { Label } from '../ui/label';

export type SegmentedOption = {
  value: string;
  label: React.ReactNode;
  /** Icône optionnelle affichée à gauche du label */
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Test id sur le bouton de l'option */
  testId?: string;
};

type Size = 'sm' | 'md';

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  name?: Path<T>;
  label?: string;
  descr?: string;
  options: SegmentedOption[];
  size?: Size;
  disabled?: boolean;
  className?: string;
  /** Mode contrôlé : valeur courante. Ignoré si `form` + `name` sont fournis. */
  value?: string;
  /** Mode contrôlé : callback de changement. Ignoré si `form` + `name` sont fournis. */
  onValueChange?: (value: string) => void;
  /** Test id sur le container radiogroup */
  testId?: string;
};

const SIZE_CLASSES: Record<Size, { container: string; button: string; text: string }> = {
  sm: {
    container: 'p-0.5',
    button: 'px-3 py-1',
    text: 'text-xs',
  },
  md: {
    container: 'p-1',
    button: 'px-4 py-1.5',
    text: 'text-sm',
  },
};

function SegmentedTrack({
  options,
  value,
  onChange,
  size,
  disabled,
  className,
  ariaLabel,
  testId,
}: {
  options: SegmentedOption[];
  value: string | undefined;
  onChange: (v: string) => void;
  size: Size;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  testId?: string;
}) {
  const sizing = SIZE_CLASSES[size];
  return (
    <div
      role='radiogroup'
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        'inline-flex items-center rounded-full border border-slate-200 bg-slate-50',
        sizing.container,
        sizing.text,
        disabled && 'opacity-60 pointer-events-none',
        className
      )}
    >
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <button
            key={option.value}
            type='button'
            role='radio'
            aria-checked={checked}
            disabled={option.disabled || disabled}
            data-testid={option.testId}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full transition-colors whitespace-nowrap',
              sizing.button,
              checked
                ? 'bg-white text-slate-800 shadow-sm font-medium'
                : 'text-slate-500 hover:text-slate-700',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {option.icon && <span className='shrink-0'>{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function SegmentedControl<T extends FieldValues>({
  form,
  name,
  label,
  descr,
  options,
  size = 'sm',
  disabled,
  className,
  value,
  onValueChange,
  testId,
}: Props<T>) {
  if (form?.control && name) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn('w-full', className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <SegmentedTrack
                options={options}
                value={field.value as string | undefined}
                onChange={(v) => field.onChange(v)}
                size={size}
                disabled={disabled}
                ariaLabel={label}
                testId={testId}
              />
            </FormControl>
            {descr && <FormDescription>{descr}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Mode contrôlé (hors RHF)
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <Label>{label}</Label>}
      <SegmentedTrack
        options={options}
        value={value}
        onChange={(v) => onValueChange?.(v)}
        size={size}
        disabled={disabled}
        ariaLabel={label}
        testId={testId}
      />
      {descr && (
        <p className='text-sm text-muted-foreground'>{descr}</p>
      )}
    </div>
  );
}
