/**
 * @description Filtre booléen synchronisé avec l'URL via nuqs — coche/décoche pour ajouter un paramètre query string à la navigation.
 * @useWhen filtrer une liste par un critère binaire (ex: "Uniquement les actifs") → CheckboxFilter | masquer/afficher des éléments via l'URL sans state React | conserver l'état du filtre au rechargement de page via query param.
 * @dontUseFor sélection multiple de valeurs → utiliser SelectMultiple | filtre sur une plage de valeurs → utiliser NumberFilter | case à cocher dans un formulaire → utiliser Checkboxes.
 * @example <CheckboxFilter queryKey="active" label="Uniquement les actifs" defaultChecked={false} />
 */
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
}

export const CheckboxFilter = ({
  queryKey,
  label,
  className,
  defaultChecked = false,
}: CheckboxFilterProps) => {
  const [value, setValue] = useQueryState(queryKey, { shallow: false });

  const checked = value === 'true' || (value == null && defaultChecked);

  const handleCheckedChange = (checked: boolean) => {
    setValue(checked ? 'true' : 'false');
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
