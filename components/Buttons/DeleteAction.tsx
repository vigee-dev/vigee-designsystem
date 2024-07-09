import { AlertDialog } from "../Forms/AlertDialog";
import { Button } from "../Buttons/Button";

interface Props {
  buttonText: string;
  title: string;
  message: string;
  deleteAction: () => void;
  className?: string;
}

export const DeleteAction = ({
  deleteAction,
  className,
  buttonText,
}: Props) => {
  return (
    <AlertDialog
      onClick={deleteAction}
      trigger={
        <Button icon="trash" variant="outline" className={className}>
          {buttonText}
        </Button>
      }
      btnQuestion={"Voulez vous supprimer cet inventaire ?"}
    />
  );
};
