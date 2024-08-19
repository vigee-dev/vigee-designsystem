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
import Link from "next/link";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  className?: string;
  children?: React.ReactNode
  disabled?: boolean
}

export default function Switch<T extends FieldValues>({
  form,
  label,
  name,
  descr,
  className,
  onChange,
  value,
  children,
  disabled = false
}: Props<T>) {
  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-row items-center justify-between py-4 border rounded-xl p-4 gap-2 text-primary bg-white", className)}>
          <div className="space-y-0.5">
            <FormLabel className="text-base ">{children ? children : label}</FormLabel>
            <FormDescription>{descr}</FormDescription>
          </div>
          <FormControl>
            <SwitchShadcn
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=unchecked]:bg-slate-200"
            />
          </FormControl>
        </FormItem>
      )}
    />
  ) : (
    <FormItem className={cn("flex flex-row items-center justify-between py-4 border rounded-xl p-4  text-primary bg-white", className)}>
      <div className="space-y-0.5">
        <FormLabel className="text-base ">{label}</FormLabel>
        <FormDescription>{descr}</FormDescription>
      </div>
      <FormControl>
        <SwitchShadcn
          disabled={disabled}
          checked={value}
          onCheckedChange={onChange}
          className="data-[state=unchecked]:bg-slate-200"
        />
      </FormControl>
    </FormItem>
  );
}
