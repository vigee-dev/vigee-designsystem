import React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { z } from "zod";
interface Props<T extends z.ZodType<any, any>> {
    label?: string;
    form: UseFormReturn<z.infer<T> & FieldValues>;
    name: Path<z.infer<T> & FieldValues>;
    className?: string;
    starting_date?: Date;
    disabled?: boolean;
}
export default function DatePicker<T extends z.ZodType<any, any, any>>({ label, form, name, className, starting_date, disabled, }: Props<T>): React.JSX.Element;
export {};
