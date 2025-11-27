import { Button } from "./Button";
import { AlertDialog } from "../Forms/AlertDialog";
import { cn } from "../lib/utils";

interface ActionWithValidationProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
  isPending?: boolean;
  action: () => void;
  icon: "trash" | "check" | "cross";
  children?: React.ReactNode;
  tooltip?: string;
  classNameIcon?: string;
}

export const ActionWithValidation = ({
  action,
  className,
  buttonText,
  isPending,
  title,
  subtitle,
  icon,
  children,
  tooltip,
  classNameIcon,
}: ActionWithValidationProps) => {
  return (
    <AlertDialog
      btnQuestion={title || "Êtes-vous sur ?"}
      btnSubAlert={subtitle || "Cette action est irréversible"}
      onClick={action}
      trigger={
        children ? (
          children
        ) : (
          <Button
            icon={icon}
            variant="outline"
            className={cn(className)}
            classNameIcon={classNameIcon}
            tooltip={tooltip}
          >
            {buttonText}
          </Button>
        )
      }
      isPending={isPending}
    />
  );
};
