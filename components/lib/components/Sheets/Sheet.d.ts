/// <reference types="react" />
interface Props {
    title?: string;
    description?: string;
    triggerText?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
}
export default function SheetTriggered({ triggerText, title, description, children, icon, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
