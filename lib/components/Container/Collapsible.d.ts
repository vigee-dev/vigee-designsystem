/// <reference types="react" />
interface CollapsibleProps {
    defaultOpen?: boolean;
    className: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
}
declare const Collapsible: ({ trigger, children, className, defaultOpen, }: CollapsibleProps) => import("react/jsx-runtime").JSX.Element;
export default Collapsible;
