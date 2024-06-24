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
};

const Checkboxes = <T extends FieldValues>({
  form,
  name,
  label,
  items,
}: Props<T>) => {
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
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-start space-x-3 space-y-0 "
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: any) => value !== item.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className=" font-medium">{item.label}</FormLabel>
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
