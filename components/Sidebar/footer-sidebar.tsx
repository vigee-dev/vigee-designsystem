/**
 * @description Bouton utilisateur en pied de sidebar affichant avatar/nom/email avec un menu déroulant de liens et actions.
 * @useWhen pied de sidebar applicative → afficher le profil connecté avec accès rapide aux actions utilisateur | sidebar avec déconnexion/paramètres compte → passer les liens via `links` avec `onClick` ou `href`
 * @dontUseFor navigation principale de la sidebar → utiliser AppSidebar | menu contextuel sans lien utilisateur → utiliser DropdownMenu
 * Le menu déroulant ne porte que ses actions (profil, notifications,
 * déconnexion) : le nom et l'e-mail sont déjà sur le bouton qui l'ouvre.
 * @example <FooterSidebar user={{ name: "Alice", email: "alice@vigee.fr", avatar: "/avatar.png" }} links={[{ name: "Profil", icon: <UserIcon />, href: "/profil" }, { name: "Déconnexion", icon: <LogOutIcon />, onClick: () => signOut() }]} />
 */
"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PiUserCircleSolid } from "../../icons/PikaIcons";

type Props = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  links: {
    name: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => Promise<void> | void;
  }[];
};

const FooterSidebar = ({ user, links }: Props) => {
  const { isMobile, state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="text-sidebar-foreground group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 shrink-0 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-sidebar-accent text-sidebar-foreground">
                  <PiUserCircleSolid className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs opacity-70">
                      {user.email}
                    </span>
                  </div>
                  <ChevronRight className="ml-auto size-4 opacity-70" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* Pas d'en-tête nom + e-mail : le bouton juste à côté les
                affiche déjà. Le menu ne porte que ses actions. */}
            <DropdownMenuGroup>
              {links.map((link) => (
                <DropdownMenuItem key={link.name}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="cursor-pointer flex gap-2 items-center"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="cursor-pointer flex gap-2 items-center w-full text-left"
                    >
                      {link.icon}
                      {link.name}
                    </button>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default FooterSidebar;
