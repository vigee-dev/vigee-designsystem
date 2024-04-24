import React from "react";
interface Props {
    name: string;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
    type?: string;
    defaultValue?: string;
}
export declare const UrlFilter: ({ name, options, placeholder, type, defaultValue }: Props) => React.JSX.Element;
export {};
