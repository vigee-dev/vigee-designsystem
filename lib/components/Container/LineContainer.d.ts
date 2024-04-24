/// <reference types="react" />
interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
    background?: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}
export declare function LineContainer({ title, children, background, icon, href, onClick, className, }: PageHeaderProps): import("react").JSX.Element;
export {};
