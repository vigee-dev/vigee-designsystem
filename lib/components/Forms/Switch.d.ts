import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
type Props<T extends FieldValues> = {
    form?: UseFormReturn<T>;
    label: string;
    placeholder?: string;
    required?: boolean;
    name?: Path<T>;
    descr?: string;
    onChange?: (value: boolean) => void;
    value?: boolean;
    className?: string;
};
export default function Switch<T extends FieldValues>({ form, label, name, descr, className, onChange, value, }: Props<T>): React.JSX.Element;
export {};
