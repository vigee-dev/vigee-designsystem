import { AlertDialog } from "../Forms/AlertDialog";
import { Button } from "../Buttons/Button";
import { cn } from "../lib/utils";

interface ActionWithValidationProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
  isPending?: boolean;
  action: () => void;
  icon: "trash" | "check" | "cross";
}

export const ActionWithValidation = ({ action, className, buttonText, isPending, title, subtitle, icon }: ActionWithValidationProps) => {
  return (
    <AlertDialog
      btnQuestion={title || "Êtes-vous sur ?"}
      btnSubAlert={subtitle || "Cette action est irréversible"}
      onClick={action}
      trigger={
        <Button icon={icon} variant="outline" className={cn(className)}>
          {buttonText}
        </Button>
      }
      isPending={isPending}
    />
  );
};
