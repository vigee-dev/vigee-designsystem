import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
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
}: SearchSelectAsyncInterface<T, Option, IsMulti>) {
  const handleFocus = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

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
                colors: { ...theme.colors, primary: "#f3f4f6" },
              })}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: 0,
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.4rem",
                  fontSize: "16px", // Assurez-vous que la taille de police est >= 16px
                  borderColor: "#f3f4f6",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  cursor: "pointer",
                  fontSize: "16px",
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
                  fontSize: "16px",
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
              }}
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
              }}
              onFocus={handleFocus}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ) : (
    <div className={`${classname} space-y-2`}>
      {label && <Label className="font-black text-primary">{label}</Label>}
      <SelectAndSearchAsync<Option, IsMulti, GroupBase<Option>>
        theme={theme => ({
          ...theme,
          colors: { ...theme.colors, primary: "#f3f4f6" },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: 0,
            backgroundColor: "#f3f4f6",
            borderRadius: "0.4rem",
            fontSize: "16px",
            borderColor: "#f3f4f6",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            fontSize: "16px",
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
            fontSize: "16px",
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
        }}
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
        }}
        onFocus={handleFocus}
      />
    </div>
  );
}
