"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { PiQuestionMarkCircleDuoStroke } from "../../icons/PikaIcons";
import { Tooltip } from "../Tooltip/Tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { cn } from "../lib/utils";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  id?: string;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  count?: boolean;
  max?: number;
  descr?: string;
  defaultValue?: string;
  className?: string;
  minHeight?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  helpComponent?: React.ReactNode;
};

export default function TextArea<T extends FieldValues>({
  form,
  id,
  name,
  required,
  label,
  placeholder,
  count,
  max,
  minHeight = "32",
  defaultValue,
  onBlur,
  onChange,
  className,
  descr,
  disabled,
  helpComponent,
}: Props<T>) {
  const [charCount, setCharCount] = useState(0); // État local pour le compteur de caractères

  return (
    <FormField
      control={form?.control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <FormItem>
          <HoverCard>
            <div className="flex items-center justify-between ">
              {label && (
                <FormLabel className="font-black text-primary mt-2">
                  {label}
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
          </HoverCard>
          <Textarea
            {...field}
            placeholder={placeholder ?? ""}
            onBlur={onBlur}
            onChange={e => {
              if (count) {
                setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
              }
              field.onChange(e);
            }}
            className={cn(
              `resize-none font-medium bg-input border-none text-[16px] md:text-sm col-span-full`,
              className
            )}
            disabled={disabled}
          />
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
