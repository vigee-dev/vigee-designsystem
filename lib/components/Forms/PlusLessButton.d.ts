import * as React from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
type Props<T extends FieldValues> = {
    title?: string;
    unit?: string;
    interval?: number;
    min?: number;
    max?: number;
    start?: number;
    form?: UseFormReturn<T>;
    name: Path<T>;
    onChange?: (e: number) => void;
};
export declare function PlusLessButton<T extends FieldValues>({ title, unit, interval, min, max, start, form, name, onChange, }: Props<T>): React.JSX.Element;
export {};
