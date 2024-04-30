import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";

import { UseFormReturn, FieldValues, Path } from "react-hook-form";

import { Switch as SwitchShadcn } from "../ui/switch";
import { cn } from "../lib/utils";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  className?: string;
};

export default function Switch<T extends FieldValues>({
  form,
  label,
  name,
  descr,
  className,
  onChange,
  value,
}: Props<T>) {
  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white",
            className
          )}
        >
          <div className="space-y-0.5">
            <FormLabel className="text-base ">{label}</FormLabel>
            <FormDescription>{descr}</FormDescription>
          </div>
          <FormControl>
            <SwitchShadcn
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  ) : (
    <FormItem
      className={cn(
        "flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white",
        className
      )}
    >
      <div className="space-y-0.5">
        <FormLabel className="text-base ">{label}</FormLabel>
        <FormDescription>{descr}</FormDescription>
      </div>
      <FormControl>
        <SwitchShadcn checked={value} onCheckedChange={onChange} />
      </FormControl>
    </FormItem>
  );
}
