import { ReactNode } from "react";
interface TabsResponsiveProps {
    defaultValue?: string;
    query?: string;
    options: {
        name: string;
        href?: string;
        value?: string;
        icon?: ReactNode;
    }[];
}
export declare const TabsResponsive: ({ options, defaultValue, query, }: TabsResponsiveProps) => import("react/jsx-runtime").JSX.Element;
export {};
