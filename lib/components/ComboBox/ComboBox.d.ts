import React from "react";
interface Item {
    value: string;
    label: string;
}
interface ComboBoxProps {
    value?: string;
    onChange: (value: string | undefined) => void;
    label?: string;
    placeholder?: string;
    items: Item[];
    icon?: React.ReactNode;
}
export declare function ComboBox({ items, value, onChange, label, placeholder, icon, }: ComboBoxProps): React.JSX.Element;
export {};
