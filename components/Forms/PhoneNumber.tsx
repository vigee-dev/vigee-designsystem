/**
 * @description Champ téléphone international intégré react-hook-form, préconfiguré en France (+33) avec sélecteur de pays.
 * @useWhen formulaire de création/édition de contact nécessitant un numéro mobile → utiliser PhoneNumber | champ téléphone avec validation react-hook-form dans un Form Vigee → utiliser PhoneNumber | champ obligatoire avec indicatif pays sélectionnable → utiliser PhoneNumber
 * @dontUseFor saisie d'un numéro fixe sans sélecteur de pays → utiliser Input | champ texte générique → utiliser Input
 * @example <PhoneNumber form={form} name="phone" label="Téléphone mobile" required />
 */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "../lib/utils";
import { PhoneInput } from "../ui/phone-input";

import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};
export default function PhoneNumber<T extends FieldValues>({
  form,
  name,
  label = "Téléphone mobile",
  placeholder = "ex : 0695069999",
  description,
  required = false,
  disabled = false,
  className,
}: Props<T>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start", className)}>
          {label && (
            <FormLabel className="font-black text-primary mt-2">
              {label} {required && <span className="text-red-600 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl className="w-full">
            <PhoneInput
              disabled={disabled}
              placeholder={placeholder}
              {...field}
              defaultCountry="FR"
              className="text-[16px]"
            />
          </FormControl>
          {description && (
            <FormDescription className="text-left">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
