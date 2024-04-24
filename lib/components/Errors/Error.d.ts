import React from "react";
interface IllustrationProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    supportEmail?: string;
    onClick?: () => void;
}
export declare function Error({ title, subtitle, children, supportEmail, onClick, }: IllustrationProps): React.JSX.Element;
export {};
