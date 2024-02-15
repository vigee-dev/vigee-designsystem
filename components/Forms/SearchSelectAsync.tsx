import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/components/vigee-designsystem/components/ui/form";
import SearchAndSelectAsync from "react-select/async";
import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {z} from "zod";
import {GroupBase, MultiValue, SingleValue} from "react-select";

interface SearchSelectAsyncInterface<Option, T extends z.ZodType<any, any>> {
  name: Path<z.infer<T> & FieldValues>,
  form?: UseFormReturn<z.infer<T> & FieldValues>,
  disabled?: boolean
  placeholder?: string
  loadOptions: (query: string) => (Promise<Option[]>)
  isClearable?: boolean
  preprocessOnChange?: (e: SingleValue<Option>) => any
  defaultOptions?: Option[]
  label?: string
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SearchSelectAsync<Option, T extends z.ZodType<any, any, any>>({
  name,
  label,
  form,
  placeholder = "Rechercher...",
  loadOptions,
  disabled = false,
  isClearable = true,
  preprocessOnChange,
  defaultOptions,
}: SearchSelectAsyncInterface<Option, T>) {
  return (<FormField
    control={form?.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel className="font-black text-primary">{label}</FormLabel>}
        <FormControl>
          {/* TODO Debounce loadoptions ? */}
          {/* TODO typeof isMulti ?*/}
          <SearchAndSelectAsync<Option, false, GroupBase<Option>>
            isClearable={isClearable}
            placeholder={placeholder}
            isDisabled={disabled} //TODO pass disabled from field.disabled ?
            onChange={(e) => {
              if(preprocessOnChange) {
                const value = preprocessOnChange(e)
                return field.onChange(value)
              }
              else return field.onChange(e)
            }}
            onBlur={field.onBlur}
            defaultOptions={defaultOptions || []}
            loadOptions={loadOptions}
            ref={field.ref}
          />

        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />)
}