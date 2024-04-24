import React from "react";
interface Props {
    years?: {
        value: string;
        label: string;
    }[];
    day?: boolean;
    week?: boolean;
    month?: boolean;
    year?: boolean;
}
export declare const PeriodFilters: ({ years, day, month, week, year, }: Props) => React.JSX.Element;
export {};
