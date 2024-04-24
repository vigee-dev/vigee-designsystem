import React from "react";
interface CollapsibleProps {
    defaultOpen?: boolean;
    className: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
}
declare const Collapsible: ({ trigger, children, className, defaultOpen, }: CollapsibleProps) => React.JSX.Element;
export default Collapsible;
