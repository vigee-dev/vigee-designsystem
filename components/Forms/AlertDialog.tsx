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
import { Button } from "../../components/ui/button";

type Props = {
  btnText: string;
  btnQuestion: string;
  btnSubAlert?: string;
  onClick: () => void;
  colorBtn?: "outline" | "destructive";
  trigger: React.ReactNode;
};

type DrawerContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DrawerContext = React.createContext<DrawerContextType | undefined>(
  undefined
);

export function useAlertContext() {
  const context = React.useContext(DrawerContext);
  if (context === undefined) {
    throw new Error(
      "useAlertContext doit être utilisé à l'intérieur d'un useAlertContext.Provider"
    );
  }
  return context;
}

export function AlertDialog({
  btnText,
  btnQuestion,
  btnSubAlert,
  colorBtn = "outline",
  onClick,
  trigger,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const contextValue: DrawerContextType = {
    open,
    setOpen,
  };

  return (
    <Alert>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="z-[1000]">
        <AlertDialogHeader>
          <AlertDialogTitle>{btnQuestion}</AlertDialogTitle>
          {btnSubAlert && (
            <AlertDialogDescription>{btnSubAlert}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onClick} className="text-white">
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Alert>
  );
}
