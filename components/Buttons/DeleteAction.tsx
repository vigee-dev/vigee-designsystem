import { Button } from "../Buttons/Button";
import { AlertDialog } from "../Forms/AlertDialog";

interface Props {
  alertTitle: string;
  alertSubTitle?: string;
  buttonText?: string;
  deleteAction: () => void;
  className?: string;
  isPending?: boolean;
}

export const DeleteAction = ({
  deleteAction,
  className,
  buttonText,
  isPending,
  alertTitle,
  alertSubTitle,
}: Props) => {
  return (
    <AlertDialog
      btnQuestion={alertTitle}
      btnSubAlert={alertSubTitle}
      onClick={deleteAction}
      trigger={
        <Button
          icon="trash"
          variant="outline"
          className={className}
          pending={isPending}
        >
          {buttonText}
        </Button>
      }
      isPending={isPending}
    />
  );
};
