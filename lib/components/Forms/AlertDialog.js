"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AlertDialog as Alert, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "../../components/ui/alert-dialog";
import { Button } from "../Buttons/Button";
var AlertContext = React.createContext(undefined);
export function useAlertContext() {
    var context = React.useContext(AlertContext);
    if (context === undefined) {
        throw new Error("useAlertContext doit être utilisé à l'intérieur d'un useAlertContext.Provider");
    }
    return context;
}
export function AlertDialog(_a) {
    var btnQuestion = _a.btnQuestion, btnSubAlert = _a.btnSubAlert, _b = _a.colorBtn, colorBtn = _b === void 0 ? "outline" : _b, onClick = _a.onClick, onCancel = _a.onCancel, trigger = _a.trigger, isPending = _a.isPending, isOpen = _a.isOpen;
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var contextValue = {
        open: open,
        setOpen: setOpen,
    };
    return (_jsxs(Alert, { open: isOpen, children: [_jsx(AlertDialogTrigger, { asChild: true, children: trigger }), _jsxs(AlertDialogContent, { className: "z-[1000]", children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: btnQuestion }), btnSubAlert && (_jsx(AlertDialogDescription, { children: btnSubAlert }))] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { onClick: onCancel, children: "Annuler" }), !isPending ? (_jsx(AlertDialogAction, { onClick: onClick, className: "text-white bg-red-500", disabled: isPending, children: "Confirmer" })) : (_jsx(Button, { onClick: onClick, variant: colorBtn, pending: true, children: "Confirmer" }))] })] })] }));
}
