import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import SelectAndSearchAsync from "react-select/async";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {GroupBase, OnChangeValue} from "react-select";

interface SearchSelectAsyncInterface<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false,
> {
  name: Path<T>;
  form: UseFormReturn<T>;
  disabled?: boolean;
  placeholder?: string;
  loadOptions: (query: string) => Promise<Option[]>;
  isClearable?: boolean;
  preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
  defaultOptions?: Option[];
  label?: string;
  isMulti?: IsMulti
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SearchSelectAsync<T extends FieldValues, Option, IsMulti extends boolean = false>({
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
}: SearchSelectAsyncInterface<T, Option, IsMulti>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (<FormLabel className="font-black text-primary">{label}</FormLabel>)}
          <FormControl>
            {/* TODO Debounce loadoptions ? */}
            {/* TODO typeof isMulti ?*/}
            <SelectAndSearchAsync<Option, IsMulti, GroupBase<Option>>
              isClearable={isClearable}
              placeholder={placeholder}
              isDisabled={disabled} //TODO pass disabled from field.disabled ?
              onChange={e => {
                if (preprocessOnChange) {
                  const value = preprocessOnChange(e);
                  return field.onChange(value);
                } else return field.onChange(e);
              }}
              onBlur={field.onBlur}
              defaultOptions={defaultOptions || []}
              loadOptions={loadOptions}
              ref={field.ref}
              isMulti={isMulti}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
