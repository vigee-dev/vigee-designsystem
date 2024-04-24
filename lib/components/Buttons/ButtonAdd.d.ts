import React from "react";
interface AddButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string;
    icon: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
    href?: string;
}
declare const ButtonAdd: React.FC<AddButtonProps>;
export default ButtonAdd;
