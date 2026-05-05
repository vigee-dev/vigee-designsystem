/**
 * @description Données statiques de configuration du header sidebar (titre, icône, type) pour l'instance Vigee Flow.
 * @useWhen initialisation de AppSidebar → passer headerData comme prop header | personnalisation du header sidebar → modifier ce fichier de config
 * @dontUseFor rendu dynamique du header → utiliser HeaderSidebar | affichage d'un logo variable → utiliser VariableLogo
 * @example <AppSidebar header={headerData} />
 */
import { HeaderDataProps } from "../type-sidebar";

export const headerData: HeaderDataProps = {
  title: "Vigee Flow",
  iconUrl: "/favicon.ico",
  type: "button",
};
