import { AlertDialog } from "../Forms/AlertDialog";
import { Button } from "../Buttons/Button";

interface Props {
  alertTitle: string;
  alertSubTitle?: string;
  buttonText?: string;
  deleteAction: () => void;
  className?: string;
  isPending?: boolean;
}

export const DeleteAction = ({ deleteAction, className, buttonText, isPending, alertTitle, alertSubTitle }: Props) => {
  return (
    <AlertDialog
      btnQuestion={alertTitle}
      btnSubAlert={alertSubTitle}
      onClick={deleteAction}
      trigger={
        <Button icon="trash" variant="outline" className={className}>
          {buttonText}
        </Button>
      }
      isPending={isPending}
    />
  );
};
