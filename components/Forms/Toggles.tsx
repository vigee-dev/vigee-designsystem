import { motion } from "framer-motion";
import React from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { PiCheckTickSquareDuoSolid } from "../../icons/PikaIcons";
import { Container } from "../Container/Container";
import { cn } from "../lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import {
  ToggleGroup as ShadToggleGroup,
  ToggleGroupItem,
} from "../ui/toggle-group";

type Option = {
  label?: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
};

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  descr?: string;
  className?: string;
  optionsClassName?: string;
  disabled?: boolean;
  options: Option[];
  nowrap?: boolean;
  multi?: boolean;
  variant?: "default" | "small";
  onChange?: (value: string) => void;
  withCheckbox?: boolean;
};

export const Toggles = <T extends FieldValues>({
  form,
  name,
  label,
  descr,
  className,
  optionsClassName,
  disabled,
  options,
  nowrap = false,
  multi = false,
  variant = "default",
  onChange,
  withCheckbox = false,
}: Props<T>) => {
  const handleValueChange = React.useCallback(
    (value: string | string[]) => {
      form.setValue(name, value as PathValue<T, Path<T>>);
      if (onChange && typeof value === "string") {
        onChange(value);
      }
    },
    [form, name, onChange]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full col-span-full">
          {label && <Label className="font-bold">{label}</Label>}
          <FormControl>
            <Container
              className={cn(
                "p-1",
                className,
                variant === "small" && "border-none"
              )}
            >
              <ShadToggleGroup
                type={multi ? "multiple" : "single"}
                className={cn(
                  "w-full grid md:grid-cols-3 gap-2",
                  nowrap && "flex-nowrap",
                  variant === "small" && "border-none w-full"
                )}
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                {options.map((option) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0.8, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ToggleGroupItem
                      value={option.value}
                      aria-label={option.label || ""}
                      disabled={option.disabled}
                      className={cn(
                        "items-center h-full p-4 flex justify-between w-full gap-4 md:px-6 rounded-lg border-none data-[state=on]:bg-input hover:bg-input",
                        optionsClassName,
                        variant === "small" &&
                          "rounded-full border-none p-2 gap-0 justify-center  data-[state=on]:bg-primary data-[state=on]:text-white md:px-3"
                      )}
                    >
                      <div className="flex items-center w-full gap-4">
                        <div>{option.icon}</div>
                        {(option.label || option.description) && (
                          <div className="w-full text-left">
                            {option.label && (
                              <span className="text-md font-bold">
                                {option.label}
                              </span>
                            )}
                            {option.description && (
                              <p className="text-xs text-gray-500">
                                {option.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      {withCheckbox &&
                        (multi
                          ? Array.isArray(field.value) &&
                            field.value.includes(option.value)
                          : field.value === option.value) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="ml-2"
                          >
                            <PiCheckTickSquareDuoSolid className="text-success-foreground" />
                          </motion.div>
                        )}
                    </ToggleGroupItem>
                  </motion.div>
                ))}
              </ShadToggleGroup>
            </Container>
          </FormControl>
          {descr && <FormDescription>{descr}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
