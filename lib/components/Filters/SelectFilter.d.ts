import React from "react";
interface Props {
    statusName: string;
    placeholder?: string;
    status: {
        label: string;
        value: string;
    }[];
}
export declare const SelectFilter: ({ statusName, status, placeholder }: Props) => React.JSX.Element;
export {};
