/**
 * @description Bouton avec modale de confirmation intégrée pour sécuriser les actions destructives ou irréversibles.
 * @useWhen suppression d'un enregistrement → utiliser ActionWithValidation avec icon="trash" | validation d'une action critique → utiliser ActionWithValidation avec icon="check" | réinitialisation de données → utiliser ActionWithValidation avec icon="refresh"
 * @dontUseFor actions sans confirmation nécessaire → utiliser Button | suppression avec feedback visuel de chargement géré ailleurs → utiliser DeleteAction
 * @example <ActionWithValidation icon="trash" title="Supprimer cet élément ?" subtitle="Cette action est irréversible." action={() => handleDelete(id)} isPending={isPending} />
 */
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
  icon: "trash" | "check" | "cross" | "refresh";
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
