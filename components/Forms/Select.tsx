import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Select as ShadSelect, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { cn } from "../lib/utils";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  label?: string;
  sublabel?: string;
  placeholder?: string;
  required?: boolean;
  name?: Path<T>;
  descr?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  helpComponent?: React.ReactNode;
  isBoolean?: boolean;
  options?: { label: string; value: string; icon?: React.ReactNode; color?: string }[];
  variant?: 'default' | 'haro';
};

export default function Select<T extends FieldValues>({
  form,
  label,
  sublabel,
  placeholder,
  required = true,
  name,
  descr,
  children,
  className,
  disabled,
  onChange,
  value,
  helpComponent,
  isBoolean = false,
  options,
  variant = 'default',
}: Props<T>) {
  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem
          className={cn(
            className,
            variant === "default" && 'border-none',
            variant === "haro" && 'border-gray-400 border-2 rounded'
          )}
        >
          <HoverCard>
            <div className="flex items-center justify-between ">
              <div className="flex flex-col gap-1 ">
                {label && (
                  <FormLabel className="font-black text-primary mt-2">
                    {label} {required && <span className="text-red-600 ml-1">*</span>}
                  </FormLabel>
                )}
                {sublabel && <Label className="font-medium text-gray-400">{sublabel}</Label>}
              </div>
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
          </HoverCard>
          <ShadSelect
            onValueChange={(e: string) => {
              if (!isBoolean) {
                field.onChange(e);
              } else {
                let eBoolean = e === "true";
                field.onChange(eBoolean);
              }
              if (onChange) onChange(e);
            }}
            value={String(field.value)}
            disabled={disabled}>
            <FormControl>
              <SelectTrigger className={`font-medium bg-input`}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="max-h-[200px] font-medium">
              {!options
                ? children
                : options.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className={`flex items-center gap-2 ${option.color}`}>
                        {option.icon}
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
            </SelectContent>
          </ShadSelect>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  ) : (
    <div className={className}>
      {label && <Label className="font-black text-primary">{label}</Label>}
      <ShadSelect onValueChange={onChange} value={String(value)} disabled={disabled}>
        <SelectTrigger className={`font-medium bg-input ${variant === "default" && 'border-none'} ${variant === "outlined" && 'border-gray-400 border-2'}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] font-medium">
          {!options
            ? children
            : options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className={`flex items-center gap-2 ${option.color}`}>
                    {option.icon}
                    {option.label}
                  </div>
                </SelectItem>
              ))}
        </SelectContent>
      </ShadSelect>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>
  );
}
