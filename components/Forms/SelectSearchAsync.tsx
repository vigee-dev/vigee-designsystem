import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import SearchAndSelectAsync from "react-select/async";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { z } from "zod";
import { GroupBase, MultiValue, SingleValue } from "react-select";

interface SearchSelectAsyncInterface<Option, T extends z.ZodType<any, any>> {
  name: Path<z.infer<T> & FieldValues>;
  form?: UseFormReturn<z.infer<T> & FieldValues>;
  disabled?: boolean;
  placeholder?: string;
  loadOptions: (query: string) => Promise<Option[]>;
  isClearable?: boolean;
  preprocessOnChange?: (e: SingleValue<Option> | MultiValue<Option>) => any;
  defaultOptions?: Option[];
  label?: string;
  isMulti?: boolean;
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SearchSelectAsync<
  Option,
  T extends z.ZodType<any, any, any>
>({
  name,
  label,
  form,
  placeholder = "Rechercher...",
  loadOptions,
  disabled = false,
  isClearable = true,
  preprocessOnChange,
  defaultOptions,
    isMulti
}: SearchSelectAsyncInterface<Option, T>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-black text-primary">{label}</FormLabel>
          )}
          <FormControl>
            {/* TODO Debounce loadoptions ? */}
            {/* TODO typeof isMulti ?*/}
            <SearchAndSelectAsync<Option, boolean, GroupBase<Option>>
                isMulti={isMulti}
              isClearable={isClearable}
              placeholder={placeholder}
              isDisabled={disabled} //TODO pass disabled from field.disabled ?
              onChange={e => {
                if (preprocessOnChange) {
                  let value;
                  if (isMulti) {
                    value = preprocessOnChange(e as MultiValue<Option>);
                  } else {
                    value = preprocessOnChange(e as SingleValue<Option>);
                  }
                  return field.onChange(value);
                } else return field.onChange(e);
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
    />
  );
}
