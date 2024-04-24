/// <reference types="react" />
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
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
export default function TextArea<T extends FieldValues>({ form, id, name, required, label, placeholder, count, max, minHeight, defaultValue, onBlur, onChange, className, descr, disabled, helpComponent, }: Props<T>): import("react").JSX.Element;
export {};
