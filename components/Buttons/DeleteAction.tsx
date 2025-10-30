import { Button } from "../Buttons/Button";
import { AlertDialog } from "../Forms/AlertDialog";

interface Props {
  alertTitle: string;
  alertSubTitle?: string;
  buttonText?: string;
  deleteAction: () => void;
  className?: string;
  isPending?: boolean;
  tooltip?: string;
  classNameIcon?: string;
}

export const DeleteAction = ({
  deleteAction,
  className,
  buttonText,
  isPending,
  alertTitle,
  alertSubTitle,
  tooltip,
  classNameIcon,
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
          tooltip={tooltip}
          classNameIcon={classNameIcon}
        >
          {buttonText}
        </Button>
      }
      isPending={isPending}
    />
  );
};
