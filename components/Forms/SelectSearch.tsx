/**
 * @description Select avec recherche intégrée (react-select) connecté à react-hook-form, support mono et multi-sélection avec options statiques.
 * @useWhen liste d'options statiques courte à moyenne avec filtrage par saisie → utiliser SelectSearch | sélection unique ou multiple dans un Form Vigee → utiliser SelectSearch | besoin d'un champ clearable avec label/sublabel dans un formulaire → utiliser SelectSearch
 * @dontUseFor source de données distante/asynchrone → utiliser SearchSelectAsync | dataset plat sans recherche nécessaire → utiliser Select | sélection multiple avec affichage en tags avancé → utiliser MultiSelect
 * @example <SelectSearch form={form} name="category" label="Catégorie" options={[{ value: "a", label: "Alpha" }]} />
 */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import SelectAndSearch from "react-select";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  GroupBase,
  OnChangeValue,
  MultiValue,
  SingleValue,
} from "react-select";
import { cn } from "../lib/utils";
import { styles } from "./SelectSearchAsync";

interface SearchSelectInterface<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false,
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
  sublabel?: string;
}

// TODO Better way to handle isMulti, Option type etc ...
export default function SelectSearch<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false,
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
  sublabel,
}: SearchSelectInterface<T, Option, IsMulti>) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(classNameContainer, "md:text-sm text-[16px] ")}>
          {label && (
            <FormLabel className="font-black text-primary">{label}</FormLabel>
          )}
          {sublabel && (
            <FormDescription className="text-sm text-gray-500">
              {sublabel}
            </FormDescription>
          )}
          <FormControl>
            {/* TODO Debounce loadoptions ? */}
            {/* TODO typeof isMulti ?*/}
            <SelectAndSearch<Option, IsMulti, GroupBase<Option>>
              theme={(theme) => ({
                ...theme,

                colors: {
                  ...theme.colors,
                  primary: "#f3f4f6",
                },
              })}
              styles={styles}
              isClearable={isClearable}
              placeholder={placeholder}
              isDisabled={disabled} //TODO pass disabled from field.disabled ?
              onChange={(e) => {
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
              components={{
                IndicatorSeparator: () => null,
              }}
              autoFocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
