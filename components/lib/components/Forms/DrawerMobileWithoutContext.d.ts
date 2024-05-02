import * as React from "react";
interface Props {
    title?: string;
    description?: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    openForced?: boolean;
    cancelButton?: boolean;
    setOpenForced?: React.Dispatch<React.SetStateAction<boolean>>;
    size?: "sm" | "md" | "lg";
}
type DrawerContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare function useDrawerContext(): DrawerContextType | undefined;
export declare function DrawerMobileWithoutContext({ children, title, description, trigger, icon, cancelButton, size, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
