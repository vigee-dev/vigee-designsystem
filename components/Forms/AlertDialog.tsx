"use client";
import React from "react";
import {
  AlertDialog as Alert,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../Buttons/Button";
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

const AlertContext = React.createContext<AlertContextType | undefined>(
  undefined
);

export function useAlertContext() {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext doit être utilisé à l'intérieur d'un useAlertContext.Provider"
    );
  }
  return context;
}

export function AlertDialog({
  btnQuestion,
  btnSubAlert,
  colorBtn = "outline",
  onClick,
  onCancel,
  trigger,
  isPending,
  isOpen,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const contextValue: AlertContextType = {
    open,
    setOpen,
  };

  return (
    <Alert open={isOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="z-[1000]">
        <AlertDialogHeader>
          <AlertDialogTitle>{btnQuestion}</AlertDialogTitle>
          {btnSubAlert && (
            <AlertDialogDescription>{btnSubAlert}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Annuler</AlertDialogCancel>
          {!isPending ? (
            <AlertDialogAction
              onClick={onClick}
              className="text-white bg-red-500"
              disabled={isPending}
            >
              Confirmer
            </AlertDialogAction>
          ) : (
            <Button onClick={onClick} variant={colorBtn} pending>
              Confirmer
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  );
}
