/// <reference types="react" />
interface MenuItem {
    name: string;
    slug?: string;
    href?: string;
    color?: string;
    icon?: string;
}
interface TabProps {
    title?: string | undefined;
    subtitle?: string | undefined;
    buttonTitle?: string;
    buttonLink?: string;
    nav?: MenuItem[];
    route?: string;
}
export default function SectionHeading({ title, subtitle, buttonTitle, buttonLink, nav, route, }: TabProps): import("react").JSX.Element;
export {};
