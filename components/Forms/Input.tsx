import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input as ShadInput } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { Label } from "../../components/ui/label";
import { cn } from "../lib/utils";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  requiredFields?: boolean;
  name?: Path<T>;
  descr?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  helpComponent?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  minimalist?: boolean;
};

export default function Input<T extends FieldValues>({
  form,
  label,
  placeholder,
  type = "text",
  required = true,
  requiredFields = true,
  name,
  descr,
  className,
  disabled,
  id,
  min,
  max,
  step,
  helpComponent,
  onChange,
  value,
  minimalist,
}: Props<T>) {
  return form && name ? (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          <HoverCard>
            <div className="flex items-center justify-between ">
              {label && (
                <FormLabel className="font-black text-primary mt-2">
                  {label}{" "}
                  {required && <span className="text-red-600 ml-1">*</span>}
                </FormLabel>
              )}
              {helpComponent && (
                <HoverCardTrigger>
                  <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
                </HoverCardTrigger>
              )}
            </div>

            {helpComponent && (
              <HoverCardContent>
                <div className="p-2">{helpComponent}</div>
              </HoverCardContent>
            )}

            <FormControl>
              <ShadInput
                placeholder={placeholder}
                {...field}
                type={type}
                disabled={disabled}
                id={id}
                min={min}
                max={max}
                step={step}
                className={cn(
                  "text-[16px] md:text-sm font-medium bg-input border-none ",
                  className,
                  minimalist &&
                    "focus-visible:ring-offset-0 bg-transparent font-bold text-black placeholder:text-gray-300 selection:border-none focus-visible:ring-0 ring-0 border-none  ring-offset-none p-0 focus:outline-none focus:ring-0 caret-black"
                )}
              />
            </FormControl>
          </HoverCard>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  ) : (
    <div className={cn("space-y-2", className)}>
      <HoverCard>
        <div className="flex items-center justify-between py-1">
          {label && <Label className="font-black text-primary">{label}</Label>}
          {helpComponent && (
            <HoverCardTrigger>
              <PiQuestionMarkCircleDuoStroke className="w-5 h-5 hover:text-primary hover:cursor-pointer text-gray-400" />
            </HoverCardTrigger>
          )}
        </div>

        {helpComponent && (
          <HoverCardContent>
            <div className="p-2">{helpComponent}</div>
          </HoverCardContent>
        )}

        <ShadInput
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          id={id}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={value}
          className="text-[16px] md:text-sm font-medium bg-input border-none"
        />
      </HoverCard>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>
  );
}
