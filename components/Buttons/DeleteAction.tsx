import React from "react";
import { AlertDialog } from "../Forms/AlertDialog";
import { Button } from "../Buttons/Button";

interface Props {
  title: string;
  message: string;
  deleteAction: () => void;
}

export const DeleteAction = ({ deleteAction }: Props) => {
  return (
    <AlertDialog
      onClick={deleteAction}
      trigger={
        <Button icon="trash" variant="outline">
          {"Supprimer l'inventaire"}
        </Button>
      }
      btnQuestion={"Voulez vous supprimer cet inventaire ?"}
    />
  );
};
