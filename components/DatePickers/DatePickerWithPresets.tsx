"use client"

import * as React from "react"
import { addDays, format, startOfMonth } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../lib/utils";
import { fr } from "date-fns/locale";
import { PiCalendarFilledStroke } from "../../icons/PikaIcons";

export type DatePreset = {
  label: string;
  getValue: () => Date;
}

const defaultPresets: DatePreset[] = [
  {
    label: "Aujourd'hui",
    getValue: () => new Date(),
  },
  {
    label: "Demain",
    getValue: () => addDays(new Date(), 1),
  },
  {
    label: "Dans une semaine",
    getValue: () => addDays(new Date(), 7),
  },
  {
    label: "Début du mois",
    getValue: () => startOfMonth(new Date()),
  },
]

interface DatePickerWithPresetsProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  presets?: DatePreset[];
  showPresets?: boolean;
}

function DatePickerWithPresets({
  value,
  onChange,
  className,
  presets = defaultPresets,
  showPresets = true,
  placeholder = "Pick a date"
}: DatePickerWithPresetsProps) {
  const handlePresetChange = (value: string | undefined) => {
    const preset = presets[Number(value)];
    onChange(preset?.getValue())
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[240px] gap-2 justify-start text-left font-normal", !value && "text-muted-foreground", className)}
        >
          <PiCalendarFilledStroke className="w-5 h-5"/>
          {value ? format(value, "PPP", { locale: fr }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        {showPresets && <Select onValueChange={handlePresetChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner"/>
          </SelectTrigger>
          <SelectContent position="popper">
            {presets.map((preset, index) => (
              <SelectItem key={index} value={index.toString()}>{preset.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>}
        <div className="rounded-md border">
          <Calendar mode="single" locale={fr} selected={value} onSelect={onChange} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerWithPresets
