/**
 * @description Bouton de retour arrière avec lien texte (desktop) et bouton flottant chevron (mobile), adaptatif selon le contexte de navigation.
 * @useWhen naviguer vers une page précise connue → utiliser avec `href` et `where` | revenir à la page précédente dans l'historique → utiliser avec `back={true}` | action de retour personnalisée → utiliser avec `onClick` et `where`
 * @dontUseFor action principale d'une page → utiliser Button | soumission ou confirmation → utiliser ButtonSubmit
 * @example <Back href="/projets" where="Projets" />
 */
"use client";

import Link from "next/link";
import { Button } from "./Button";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { PiChevronLeftStroke } from "../../icons/PikaIcons";

interface BackProps {
  href?: string;
  where?: string;
  onClick?: () => void;
  linkBtn?: boolean;
  className?: string;
  back?: boolean;
}

const Back: React.FC<BackProps> = ({
  href,
  where,
  onClick,
  className,
  back = false,
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={cn(" flex-grid text-slate-400 hidden md:flex", className)}
      >
        {href ? (
          <Link
            href={href}
            className="flex flex-grid text-slate-400  hover:text-primary transform ease-in-out duration-200 hover:font-bold items-center"
          >
            <PiChevronLeftStroke className="w-4 h-4" />
            <p className="mx-1 text-sm "> {where}</p>
          </Link>
        ) : (
          <div
            onClick={back ? () => router.back() : onClick}
            className="flex flex-grid text-slate-400  hover:text-primary transform ease-in-out duration-200 hover:font-bold items-center hover:cursor-pointer"
          >
            <PiChevronLeftStroke />
            <p className="mx-1 text-sm "> {where}</p>
          </div>
        )}
      </div>

      <Button
        icon="chevronLeft"
        href={back ? "" : href}
        onClick={back ? () => router.back() : onClick}
        classNameIcon="bg-slate-900 text-slate-50 h-12 w-12 rounded-full bg-slate-900 p-2 shrink-0 hover:text-slate-900 hover:bg-slate-50 z-50"
        className="md:hidden fixed bottom-12 left-0 z-50"
      />
    </>
  );
};

export default Back;
