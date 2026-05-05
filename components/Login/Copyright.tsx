/**
 * @description Affiche le pied de page de copyright avec l'année courante, le nom du client et un lien vers Vigee.
 * @useWhen page de login → placer en bas du formulaire d'authentification | page publique nécessitant une mention légale → afficher le copyright client
 * @dontUseFor contenu juridique détaillé → utiliser une page dédiée | affichage dans l'application principale → réserver aux écrans Login
 * @example <Copyright clientName="MonEntreprise" />
 */
import Link from "next/link";

interface Props {
  clientName?: string;
}

const Copyright = ({ clientName = "Vigee" }: Props) => {
  return (
    <div className=" bottom-1 justify-center mx-auto max-w-sm text-center mb-2">
      <p className="text-sm text-gray-500  md:block p-0 md:p-5 bottom-1 left-0 mt-4">
        Copyright &copy; {new Date().getFullYear()}{" "}
        {`${clientName}. Tous droits réservés. Developed by `}{" "}
        <Link href="https://www.vigee.fr" className="text-black font-bold">
          Vigee
        </Link>
      </p>
    </div>
  );
};

export default Copyright;
