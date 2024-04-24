import React from "react";
interface MenuItem {
    name: string;
    slug?: string;
    href?: string;
    color?: string;
    icon?: React.ReactNode;
    iconFill?: React.ReactNode;
}
interface TabProps {
    nav?: MenuItem[];
}
declare function MobileMenu({ nav }: TabProps): React.JSX.Element;
export default MobileMenu;
