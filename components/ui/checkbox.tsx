/**
 * @description Primitive checkbox Radix UI stylée Vigee, avec support data-testid et états checked/disabled/focus.
 * @useWhen case à cocher unique dans un formulaire react-hook-form → combiner avec Forms/Checkboxes | consentement ou option booléenne isolée → utiliser directement | tests automatisés nécessitant un sélecteur stable → passer data-testid
 * @dontUseFor sélection de plusieurs options liées → utiliser Forms/Checkboxes | activation/désactivation d'un paramètre → utiliser Switch
 * @example <Checkbox checked={isChecked} onCheckedChange={setIsChecked} data-testid="accept-terms" />
 */
'use client';
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    'data-testid'?: string;
  }
>(({ className, 'data-testid': dataTestId, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    data-testid={dataTestId}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className='h-4 w-4' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
