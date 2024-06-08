import React, { useEffect, useState } from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import {
  Select as ShadSelect,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";

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
  step?: number;
  minTime?: string;
  maxTime?: string;
};

const generateTimeOptions = (
  step: number,
  minTime?: string,
  maxTime?: string
) => {
  const options = [];
  const [minHour, minMinute] = minTime
    ? minTime.split(":").map(Number)
    : [0, 0];
  const [maxHour, maxMinute] = maxTime
    ? maxTime.split(":").map(Number)
    : [23, 59];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += step) {
      if (
        (i >= minHour || (i === minHour && j >= minMinute)) &&
        (i <= maxHour || (i === maxHour && j <= maxMinute))
      ) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        options.push({
          label: `${hour}:${minute}`,
          value: `${hour}:${minute}`,
        });
      }
    }
  }
  return options;
};

export default function TimePicker<T extends FieldValues>({
  form,
  label,
  sublabel,
  placeholder,
  required = true,
  name,
  descr,
  className,
  disabled,
  onChange,
  value,
  helpComponent,
  step = 15,
  minTime,
  maxTime,
}: Props<T>) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    setOptions(generateTimeOptions(step, minTime, maxTime));
  }, [step, minTime, maxTime]);

  return form?.control && name ? (
    <FormField
      control={form.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem className={className}>
          <HoverCard>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                {label && (
                  <FormLabel className="font-black text-primary mt-2">
                    {label}{" "}
                    {required && <span className="text-red-600 ml-1">*</span>}
                  </FormLabel>
                )}
                {sublabel && (
                  <Label className="font-medium text-gray-400">
                    {sublabel}
                  </Label>
                )}
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
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
            value={String(field.value)}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="font-medium bg-input border-none">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="max-h-[200px] font-medium">
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
      <ShadSelect
        onValueChange={onChange}
        value={String(value)}
        disabled={disabled}
      >
        <SelectTrigger className="font-medium bg-input border-none">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] font-medium">
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadSelect>
      {descr && <p className={"text-sm text-muted-foreground"}>{descr}</p>}
    </div>
  );
}
