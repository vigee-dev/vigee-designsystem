"use client";
import { Textarea } from "@/app/components/design-system/components/ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";

interface TextAreaVigeeProps {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  count?: boolean;
  max?: number;
  defaultValue?: string;
  minHeight?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  id,
  name,
  label,
  placeholder,
  count,
  max,
  minHeight,
  defaultValue,
  onBlur,
  onChange,
}: TextAreaVigeeProps) => {
  const [charCount, setCharCount] = useState(0); // État local pour le compteur de caractères

  return (
    <div className="w-full my-2">
      <div className="flex justify-between items-center ">
        {label && (
          <Label htmlFor={id} className="mb-2">
            {label}
          </Label>
        )}
        {count && (
          <span className="text-xs text-gray-500">
            {charCount} / {max}
          </span>
        )}
      </div>
      <Textarea
        name={name}
        id={id}
        placeholder={placeholder ?? ""}
        onChange={(e) => {
          if (count) {
            setCharCount(e.target.value.length); // Mise à jour du compteur de caractères
          }
          onChange && onChange(e);
        }}
        maxLength={max}
        defaultValue={defaultValue ?? ""}
        className={`min-h-${minHeight || "10"} h-${minHeight || "10"}`}
        onBlur={onBlur}
      />
    </div>
  );
};
