"use client";
import * as React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
} from "@/app/components/vigee-designsystem/components/ui/form";

type Props<T extends FieldValues> = {
  title?: string
  unit?: string
  interval?: number
  min?: number
  max?: number
  start?: number
  form?: UseFormReturn<T>
  name: Path<T>
  onChange?: (e: number) => void;
};

// TODO rethink the way this component handle changes
// TODO add onChange prop to handleChange withouth RHF
export function PlusLessButton<T extends FieldValues>({
  title,
  unit,
  interval = 0.5,
  min = 1,
  max = 100,
  start = 1,
  form,
  name,
  onChange
}: Props<T>) {
  const [goal, setGoal] = React.useState<number>(form?.getValues(name) ? form.getValues(name) : start)

  function onClick(adjustment: number) {
    const newValue = Math.max(min, Math.min(max, goal + adjustment))
    onChange && onChange(newValue)
    setGoal(newValue);
  }

  React.useEffect(() => {
    form?.setValue(name, goal as PathValue<T, Path<T>>, {
      shouldValidate: true,
    })
  }, [form, name, start, goal]);

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mx-auto w-full max-w-sm">
          {title && <FormLabel className="font-black text-primary">{title}</FormLabel>}
          <div className=" pb-0">
            <div className="flex items-center justify-center space-x-2">

              <Button type="button" variant="outline" size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-interval)}
                disabled={goal <= min}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Diminuer</span>
              </Button>

              <div className="flex-1 text-center">
                <div className="text-3xl font-bold tracking-tighter text-primary">{goal}</div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">{unit}</div>
              </div>

              <Button type="button" variant="outline" size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(interval)}
                disabled={goal >= max}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>

            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
