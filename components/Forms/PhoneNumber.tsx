import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { PhoneInput } from "../ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};
export default function PhoneNumber<T extends FieldValues>({
  form,
  name,
  label = "Téléphone mobile",
  placeholder = "Entrer un numéro",
  description = "Votre numéro de téléphone mobile",
  required = false,
}: Props<T>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          {label && (
            <FormLabel className="font-black text-primary mt-2">
              {label}
            </FormLabel>
          )}
          <FormControl className="w-full">
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry="FR"
            />
          </FormControl>
          <FormDescription className="text-left">{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
