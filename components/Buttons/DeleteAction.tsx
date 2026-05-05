/**
 * @description Bouton corbeille avec modale de confirmation AlertDialog intégrée pour sécuriser les suppressions.
 * @useWhen supprimer une entité (utilisateur, projet, document) avec confirmation obligatoire → utiliser DeleteAction | action de suppression dans une ligne de tableau → utiliser DeleteAction | suppression avec état de chargement asynchrone → utiliser DeleteAction avec isPending
 * @dontUseFor action destructrice sans confirmation requise → utiliser Button | suppression groupée de plusieurs éléments → utiliser ActionWithValidation
 * @example <DeleteAction alertTitle="Supprimer ce projet ?" alertSubTitle="Cette action est irréversible." deleteAction={() => handleDelete(id)} isPending={isPending} />
 */
import { Button } from "./Button";
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
