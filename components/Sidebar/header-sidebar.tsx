/**
 * @description Affiche le bouton d'en-tête de la sidebar (logo, nom d'app, etc.) encapsulé dans un SidebarMenu Vigee.
 * @useWhen zone haute de la sidebar pour identifier l'application ou l'organisation | wrapping de HeaderButtonSidebar dans la structure SidebarMenu standard
 * @dontUseFor navigation principale → utiliser AppSidebar | affichage d'infos utilisateur → utiliser FooterSidebar
 * @example <HeaderSidebar headerData={{ name: "Vigee", logo: LogoIcon, plan: "Pro" }} />
 */
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { HeaderDataProps } from "./type-sidebar";
import HeaderButtonSidebar from "./header-button-sidebar";

type Props = {
  headerData: HeaderDataProps;
};

const HeaderSidebar = ({ headerData }: Props) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <HeaderButtonSidebar headerData={headerData} />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default HeaderSidebar;
