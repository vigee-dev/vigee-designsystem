/// <reference types="react" />
interface Props {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}
export default function SheetTriggered({ title, description, children, }: Props): import("react").JSX.Element;
export {};
