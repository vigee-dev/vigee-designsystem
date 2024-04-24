import React from "react";
interface IllustrationProps {
    text?: string;
    buttonLink?: string;
    buttonText?: string;
    subtitle?: string;
    children?: React.ReactNode;
    supportEmail?: string;
}
export default function EmptyIllustration({ text, subtitle, buttonLink, buttonText, children, }: IllustrationProps): React.JSX.Element;
export {};
