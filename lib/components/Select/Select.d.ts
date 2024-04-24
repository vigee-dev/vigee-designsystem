import * as React from "react";
interface Option {
    value: string;
    label: string;
    group?: string;
}
interface SelectScrollableProps {
    options: Option[];
    placeholder?: string;
    onChange: (value: string | undefined) => void;
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    label?: string;
}
export declare function Select({ options, placeholder, onChange, className, disabled, defaultValue, label, }: SelectScrollableProps): React.JSX.Element;
export {};
