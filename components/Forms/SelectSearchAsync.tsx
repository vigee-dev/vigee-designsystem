import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import SelectAndSearchAsync from "react-select/async";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { ActionMeta, GroupBase, OnChangeValue } from "react-select";
import { MultiValue, SingleValue, PropsValue } from "react-select";
import { Label } from "../ui/label";
import { cn } from "../lib/utils";

interface SearchSelectAsyncInterface<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
> {
  classname?: string;
  name?: Path<T>;
  form?: UseFormReturn<T>;
  disabled?: boolean;
  placeholder?: string;
  loadOptions: (query: string) => Promise<Option[]>;
  isClearable?: boolean;
  preprocessOnChange?: (e: OnChangeValue<Option, IsMulti>) => any;
  defaultOptions?: Option[] | boolean;
  defaultValue?: IsMulti extends true
    ? MultiValue<Option>
    : SingleValue<Option>;
  value?: PropsValue<Option>;
  label?: string;
  isMulti?: IsMulti;
  noOptionsMessage?: string;
  onChange?: (
    newValue: OnChangeValue<Option, IsMulti>,
    actionMeta: ActionMeta<Option>
  ) => void;
  isSearchable?: boolean;
  customErrorMessage?: string;
  menuPlacement?: "auto" | "bottom" | "top";
}

export default function SearchSelectAsync<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false
>({
  classname,
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
  onChange,
  value,
  isSearchable = true,
  customErrorMessage,
  menuPlacement = "auto",
}: SearchSelectAsyncInterface<T, Option, IsMulti>) {
  return form && name ? (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("text-[16px] ", classname)}>
          {label && (
            <FormLabel className="font-black text-primary">{label}</FormLabel>
          )}
          <FormControl>
            <SelectAndSearchAsync<Option, IsMulti, GroupBase<Option>>
              theme={theme => ({
                ...theme,
                colors: { ...theme.colors, primary: "#FFF" },
              })}
              styles={styles}
              isClearable={isClearable}
              placeholder={placeholder}
              isDisabled={disabled}
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
              isMulti={isMulti}
              value={value}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
              }}
              isSearchable={isSearchable}
              maxMenuHeight={400}
              menuShouldScrollIntoView
              blurInputOnSelect
              menuPlacement={menuPlacement}
              autoFocus
            />
          </FormControl>
          <FormMessage>{customErrorMessage}</FormMessage>
        </FormItem>
      )}
    />
  ) : (
    <div className={`${classname} space-y-2`}>
      {label && <Label className="font-black text-primary">{label}</Label>}
      <SelectAndSearchAsync<Option, IsMulti, GroupBase<Option>>
        theme={theme => ({
          ...theme,
          colors: { ...theme.colors, primary: "#FFF" },
        })}
        styles={styles}
        isClearable={isClearable}
        placeholder={placeholder}
        isDisabled={disabled}
        onChange={onChange}
        defaultOptions={defaultOptions || []}
        defaultValue={defaultValue}
        noOptionsMessage={() => noOptionsMessage}
        loadOptions={loadOptions}
        isMulti={isMulti}
        value={value}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
        }}
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        menuShouldScrollIntoView={false}
        blurInputOnSelect
        menuShouldBlockScroll
        maxMenuHeight={400}
        autoFocus
      />
    </div>
  );
}

export const styles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    border: "0px solid #f3f4f6",
    backgroundColor: "#f3f4f6",
    borderRadius: "0.5rem",
    fontSize: "14px",
    borderColor: "#999",
    fontWeight: "500",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    margin: "0px",
    fontSize: "16px",
    color: "#000",
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    cursor: "pointer",
    fontSize: "14px",
    backgroundColor: state.isSelected ? "#f3f4f6" : "#FFFFFF",
    color: state.isSelected ? "#111" : "#000",
    ":hover": {
      backgroundColor: "#f1f1f1",
    },
    border: 0,
    fontWeight: "600",
  }),
  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    cursor: "pointer",
    backgroundColor: "#FFF",
    color: "#000",
    borderRadius: "1rem",
    fontSize: "14px",
    fontWeight: "600",
    padding: "0.1rem 1rem",
  }),
  multiValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    cursor: "pointer",
    backgroundColor: "#FFF",
    color: "#000",
    borderRadius: "1rem",
    fontSize: "14px",
    fontWeight: "600",
  }),
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    zIndex: 9999,
    color: "#000",
    fontSize: "14px",
    fontWeight: "600",
  }),
};
