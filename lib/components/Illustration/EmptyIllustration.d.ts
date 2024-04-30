/// <reference types="react" />
interface IllustrationProps {
    text?: string;
    buttonLink?: string;
    buttonText?: string;
    subtitle?: string;
    children?: React.ReactNode;
    supportEmail?: string;
}
export default function EmptyIllustration({ text, subtitle, buttonLink, buttonText, children, }: IllustrationProps): import("react/jsx-runtime").JSX.Element;
export {};
