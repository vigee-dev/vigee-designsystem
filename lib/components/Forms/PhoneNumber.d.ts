import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
type Props<T extends FieldValues> = {
    form?: UseFormReturn<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
};
export default function PhoneNumber<T extends FieldValues>({ form, name, label, placeholder, description, required, disabled, className, }: Props<T>): React.JSX.Element;
export {};
