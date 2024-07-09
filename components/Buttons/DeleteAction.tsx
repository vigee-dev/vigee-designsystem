import { AlertDialog } from "../Forms/AlertDialog";
import { Button } from "../Buttons/Button";

interface Props {
  title: string;
  message: string;
  deleteAction: () => void;
  className?: string;
}

export const DeleteAction = ({ deleteAction, className }: Props) => {
  return (
    <AlertDialog
      onClick={deleteAction}
      trigger={
        <Button icon="trash" variant="outline" className={className}>
          {"Supprimer l'inventaire"}
        </Button>
      }
      btnQuestion={"Voulez vous supprimer cet inventaire ?"}
    />
  );
};
