import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import SelectAndSearch from "react-select";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  GroupBase,
  OnChangeValue,
  MultiValue,
  SingleValue,
} from "react-select";
import { cn } from "../../lib/utils";

interface SearchSelectInterface<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
> {
  name: Path<T>;
  form?: UseFormReturn<T>;
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
  options: Option[];
  label?: string;
  isMulti?: IsMulti;
  defaultOptions?: Option[];
  defaultValue?: IsMulti extends true
    ? MultiValue<Option>
    : SingleValue<Option>;
  classNameContainer?: string;
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SelectSearch<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
>({
  name,
  label,
  form,
  placeholder = "Rechercher...",
  disabled = false,
  isClearable = true,
  preprocessOnChange,
  options,
  isMulti,
  defaultOptions,
  defaultValue,
  classNameContainer,
}: SearchSelectInterface<T, Option, IsMulti>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(classNameContainer, "md:text-sm text-[16px]")}>
          {label && (
            <FormLabel className="font-black text-primary">{label}</FormLabel>
          )}
          <FormControl>
            {/* TODO Debounce loadoptions ? */}
            {/* TODO typeof isMulti ?*/}
            <SelectAndSearch<Option, IsMulti, GroupBase<Option>>
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
                  fontSize: "14px",
                  borderRadius: "0.4rem",
                  padding: "0.2rem",
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
              options={options}
              ref={field.ref}
              isMulti={isMulti}
              defaultValue={defaultValue || field.value}
              value={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
