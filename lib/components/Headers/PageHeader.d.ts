import React from "react";
interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
    small?: boolean;
    icon?: React.ReactNode;
    className?: string;
}
export declare function PageHeader({ title, children, small, icon, className, }: PageHeaderProps): React.JSX.Element;
export {};
