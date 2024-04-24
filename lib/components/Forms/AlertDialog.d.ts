import React from "react";
type Props = {
    btnSubAlert?: string;
    onClick: () => void;
    onCancel?: () => void;
    colorBtn?: "outline" | "destructive";
    trigger?: React.ReactNode;
    btnQuestion: string;
    isPending?: boolean;
    isOpen?: boolean;
};
type AlertContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare function useAlertContext(): AlertContextType;
export declare function AlertDialog({ btnQuestion, btnSubAlert, colorBtn, onClick, onCancel, trigger, isPending, isOpen }: Props): React.JSX.Element;
export {};
