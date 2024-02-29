import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import SelectAndSearchAsync from "react-select/async";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { GroupBase, OnChangeValue } from "react-select";
import { MultiValue, SingleValue } from "react-select";

interface SearchSelectAsyncInterface<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
> {
  name: Path<T>;
  form: UseFormReturn<T>;
  disabled?: boolean;
  placeholder?: string;
  loadOptions: (query: string) => Promise<Option[]>;
  isClearable?: boolean;
  preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
  defaultOptions?: Option[];
  defaultValue?: IsMulti extends true
    ? MultiValue<Option>
    : SingleValue<Option>;
  label?: string;
  isMulti?: IsMulti;
  noOptionsMessage?: string;
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SearchSelectAsync<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
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
  isMulti,
  noOptionsMessage = "Aucun résultat",
  defaultValue,
}: SearchSelectAsyncInterface<T, Option, IsMulti>) {
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
            <SelectAndSearchAsync<Option, IsMulti, GroupBase<Option>>
              theme={theme => ({
                ...theme,

                colors: {
                  ...theme.colors,
                  primary: "#f3f4f6",
                },
              })}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.4rem",
                  fontSize: "14px",
                  borderColor: "#f3f4f6",
                }),

                option: (baseStyles, state) => ({
                  ...baseStyles,
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: "#FFFFFF",
                  ":hover": {
                    backgroundColor: "#EEEEEE",
                  },
                  border: 0,
                }),
                singleValue: (baseStyles, state) => ({
                  ...baseStyles,
                  cursor: "pointer",
                  backgroundColor: "#FFF",
                  padding: "0.2rem",
                  boxShadow: "0 0 0 1px #EEE",
                  fontSize: "14px",
                  borderRadius: "0.4rem",
                }),

                multiValue: (baseStyles, state) => ({
                  ...baseStyles,
                  cursor: "pointer",
                  backgroundColor: "#FFF",
                  color: "#000",
                  borderRadius: "0.4rem",
                  fontSize: "16px",
                }),
                multiValueLabel: (styles, { data }) => ({
                  ...styles,
                  color: "#111",
                }),
                multiValueRemove: (styles, { data }) => ({
                  ...styles,
                  color: "#111",
                  borderRadius: "0.4rem",
                  ":hover": {
                    backgroundColor: "#DDD",
                    color: "#111",
                  },
                }),
              }}
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
              defaultValue={defaultValue || field.value}
              noOptionsMessage={() => noOptionsMessage}
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
