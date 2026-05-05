/**
 * @description Affiche l'en-tête de la sidebar avec logo adaptatif (plié/déplié), titre, sous-titre et icône chevron selon le type (lien ou bouton).
 * @useWhen header de sidebar avec logo différent selon l'état ouvert/fermé → utiliser HeaderButtonSidebar | header cliquable redirigeant vers une URL → passer `type: "link"` dans headerData | header déclenchant un dropdown/switcher → passer `type: "button"` dans headerData
 * @dontUseFor navigation principale de la sidebar → utiliser AppSidebar | switcher d'espace de travail complet → utiliser SwitcherSidebar
 * @example <HeaderButtonSidebar headerData={{ title: "Mon App", subtitle: "Workspace", iconUrl: "/icon.png", type: "link", url: "/" }} logo="/logo.svg" logoSmall="/logo-small.svg" />
 */
"use client";

import Image from "next/image";
import { HeaderDataProps } from "./type-sidebar";
import { ChevronsUpDown } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import Link from "next/link";
type Props = {
  headerData: HeaderDataProps;
  logo?: string;
  logoSmall?: string;
};

const HeaderButtonSidebar = ({ headerData, logo, logoSmall }: Props) => {
  const { open } = useSidebar();

  const content = (
    <>
      <Image
        src={
          logo && logoSmall
            ? open
              ? logo
              : logoSmall
            : headerData.iconUrl || ""
        }
        alt="icon"
        width={120}
        height={120}
      />
      {!logo && (
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-semibold">{headerData.title}</span>
          {headerData?.subtitle && (
            <span className="">{headerData.subtitle}</span>
          )}
        </div>
      )}
      {headerData.type === "button" && <ChevronsUpDown className="ml-auto" />}
    </>
  );

  return (
    <>
      {" "}
      {headerData.type === "link" ? (
        <Link href={headerData.url}>{content}</Link>
      ) : (
        content
      )}
    </>
  );
};

export default HeaderButtonSidebar;
