/// <reference types="react" />
import { StaticImageData } from "next/image";
interface SidebarProps {
    logo?: StaticImageData;
    background?: string;
    dark?: boolean;
    text?: string;
    children: React.ReactNode;
    noLogo?: boolean;
    navigation: {
        name: string;
        href: string;
        icon: React.ReactNode;
        iconFill?: React.ReactNode;
        slug: string;
        highlight?: boolean;
        notifications?: number;
    }[];
    menu?: boolean;
    logoSmall?: StaticImageData;
    title?: string;
    width?: number;
    height?: number;
    withSelect?: boolean;
    selectOptions?: {
        value: string;
        label: string;
    }[];
    onChangeSelect?: (selected: string) => void;
    classNameSelect?: string;
    selectPlaceHolder?: string;
    defaultValueSelect?: string;
    bgColor?: string;
    className?: string;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
