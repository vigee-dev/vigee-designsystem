/**
 * @description Primitif input HTML stylisé Vigee : champ texte brut avec gestion focus, disabled et upload de fichier.
 * @useWhen composition d'un champ personnalisé sans react-hook-form → utiliser Input directement | input non contrôlé par un Form Vigee → utiliser Input | besoin d'un input de type file simple → utiliser Input avec type="file"
 * @dontUseFor formulaire avec validation react-hook-form → utiliser Forms/Input | saisie téléphone → utiliser PhoneNumber | recherche avec suggestions → utiliser ComboBox
 * @example <Input type="email" placeholder="email@exemple.com" disabled={false} />
 */
import { cn } from '../lib/utils';
import * as React from 'react';
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
