import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type CheckboxItem = { label: string; value: string | number };

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  items: CheckboxItem[];
  /** Nombre maximum d'éléments sélectionnables */
  max?: number;
};

const Checkboxes = <T extends FieldValues>({
  form,
  name,
  label,
  items,
  max,
}: Props<T>) => {
  const currentValue = form.watch(name) as (string | number)[];
  const isMaxReached = max !== undefined && currentValue?.length >= max;
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="">
          <div className="mb-4">
            {label && (
              <FormLabel className="text-base font-bold text-primary">
                {label}
              </FormLabel>
            )}
          </div>
          {items.map(item => (
            <FormField
              key={item.value}
              control={form.control}
              name={name}
              render={({ field }) => {
                const isChecked = field.value?.includes(item.value);
                const isDisabled = !isChecked && isMaxReached;
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0 "
                  >
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        disabled={isDisabled}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string | number) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className={`font-medium ${isDisabled ? "text-slate-400" : ""}`}>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Checkboxes;
