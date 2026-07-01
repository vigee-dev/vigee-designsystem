/**
 * @description Switcher de contexte dans la sidebar : permet de naviguer entre les apps principales et les projets via un dropdown avec logo et item actif auto-détecté.
 * @useWhen sidebar multi-apps (Leads, RH, Finances, Studio) → afficher le switcher de contexte | navigation entre projets Studio avec détection de route active | sidebar avec logo variable selon l'état ouvert/réduit
 * @dontUseFor navigation par onglets horizontaux → utiliser TabsResponsive | menu secondaire dans la sidebar → utiliser SectionHeading | sélection d'une valeur dans un formulaire → utiliser Select
 * @example <SwitcherSidebar items={appItems} menuTitle="Espace" logo="/logo.svg" logoSmall="/icon.svg" showSwitcher={true} />
 */
"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "../lib/utils";
import {
  PiCodeStroke,
  PiChatChattingStroke,
  PiFileTextStroke,
  PiSearchDefaultStroke,
} from "../../icons/PikaIcons";

type SwitcherItem = {
  name: string;
  slug: string;
  icon: React.ReactNode;
  iconFill?: React.ReactNode;
  type?: string;
  subtitle?: string;
  projectId?: number;
  /** Projet à l'étude → regroupé tout en bas de la liste, après un séparateur. */
  isStudy?: boolean;
  /** Compteur affiché en pastille à droite de l'item (ex. mails à traiter). */
  badge?: number;
  counts?: {
    cadrageCount: number;
    devisCount: number;
    studioCount: number;
    supportCount: number;
  };
};

export function SwitcherSidebar({
  items,
  menuTitle,
  logo,
  logoSmall,
  showSwitcher = true,
  currentPath,
}: {
  items: SwitcherItem[];
  menuTitle?: string;
  logo?: string;
  logoSmall?: string;
  showSwitcher?: boolean;
  currentPath?: string;
}) {
  // "open" dérivé de l'état effectif (gère la tablette repliée).
  const { isMobile, state } = useSidebar();
  const open = state === "expanded";
  const router = useRouter();
  const searchParams = useSearchParams();

  // Utiliser usePathname pour détecter les changements de route côté client
  const clientPath = usePathname();
  // Utiliser le path client s'il est disponible, sinon le path serveur
  const activePath = clientPath || currentPath;

  // Trouver l'item actif basé sur le path courant
  const activeItem = items.find((item) => {
    // Apps indépendantes — détecter par préfixe de route
    if (activePath?.startsWith("/leads") && item.slug.startsWith("/leads"))
      return true;
    if (activePath?.startsWith("/mail") && item.slug.startsWith("/mail"))
      return true;
    if (activePath?.startsWith("/rh") && item.slug.startsWith("/rh"))
      return true;
    if (
      activePath?.startsWith("/finances") &&
      item.slug.startsWith("/finances")
    )
      return true;
    if (
      activePath?.startsWith("/administration") &&
      item.slug.startsWith("/administration")
    )
      return true;
    if (activePath?.startsWith("/system") && item.slug.startsWith("/system"))
      return true;

    if (activePath?.includes("/studio/projects/")) {
      // Si on est sur un projet, chercher le projet correspondant
      const projectMatch = activePath.match(/\/studio\/projects\/(\d+)/);
      if (projectMatch) {
        const projectPattern = new RegExp(
          `/studio/projects/${projectMatch[1]}(/|$)`,
        );
        return projectPattern.test(item.slug);
      }
    }
    // Sur une page ticket avec projectId en query param, garder le contexte projet
    const projectIdParam = searchParams?.get("projectId");
    if (activePath?.startsWith("/studio/tickets/") && projectIdParam) {
      const projectPattern = new RegExp(
        `/studio/projects/${projectIdParam}(/|$)`,
      );
      return projectPattern.test(item.slug);
    }
    // Studio = tout /studio sauf les pages projets
    if (
      item.type === "studio" &&
      activePath?.startsWith("/studio") &&
      !activePath?.includes("/studio/projects/")
    ) {
      return true;
    }
    return false;
  });

  // Ordre d'affichage : items principaux (apps + studio) en haut, projets au milieu,
  // items "bottom" (Mail, Vigee System) tout en bas après la liste des projets.
  const mainItems = items.filter(
    (item) => item.type === "app" || item.type === "studio",
  );
  const projectItems = items.filter((item) => item.type === "project");
  const bottomItems = items.filter((item) => item.type === "bottom");

  // Logo inline
  const logoElement = (
    <div className="flex items-center justify-start py-2 px-2">
      {logo && open ? (
        <Image src={logo} alt="logo" width={120} height={40} />
      ) : logoSmall ? (
        <Image src={logoSmall} alt="logo" width={32} height={32} />
      ) : null}
    </div>
  );

  // Si pas de switcher, afficher juste le logo
  if (!showSwitcher) {
    return (
      <div className="flex flex-col">
        {logoElement}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Logo en haut */}
      {logoElement}

      {/* Switcher en dessous */}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white data-[state=open]:bg-white group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center"
              >
                <div
                  className={
                    open
                      ? "flex min-w-0 flex-1 items-center gap-2"
                      : "flex items-center justify-center [&>svg]:size-5"
                  }
                >
                  {activeItem?.iconFill || activeItem?.icon}
                  {open && (
                    <div className="flex min-w-0 flex-1 flex-col text-left">
                      <span className="truncate text-sm font-medium text-gray-500">
                        {activeItem?.name || "Sélectionner"}
                      </span>
                      {activeItem?.subtitle && (
                        <span className="truncate text-xs text-slate-400">
                          {activeItem.subtitle}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {open && <ChevronsUpDown className="h-4 w-4 text-slate-400" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-2xl max-h-96 overflow-y-auto"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {/* Items principaux : Leads, Talents, Finances, Studio */}
              {mainItems.map((item) => (
                <DropdownMenuItem
                  key={item.slug}
                  onClick={() => {
                    router.push(item.slug);
                  }}
                  className={cn(
                    "gap-2 p-2 cursor-pointer",
                    activeItem?.slug === item.slug && "bg-slate-100",
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="flex items-center justify-center w-5 h-5 [&>svg]:w-4 [&>svg]:h-4 text-slate-600">
                      {item.iconFill || item.icon}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium">{item.name}</span>
                      {item.subtitle && (
                        <span className="text-[11px] text-slate-400 -mt-0.5">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                    {/* Pastille de compteur (ex. mails à traiter). */}
                    {item.badge ? (
                      <span className="ml-auto text-[10px] font-medium bg-blue-100 text-blue-600 min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center">
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    ) : null}
                  </div>
                </DropdownMenuItem>
              ))}
              {mainItems.length > 0 && projectItems.length > 0 && (
                <DropdownMenuSeparator />
              )}

              {/* Section Projets */}
              {projectItems.length > 0 && (
                <>
                  <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                    Projets
                  </DropdownMenuLabel>
                  {projectItems.map((item, projectIndex) => {
                    // Trait avant le PREMIER projet à l'étude (les études sont groupées
                    // en fin de liste par l'appelant) : sépare visuellement "à l'étude".
                    const isFirstStudy =
                      item.isStudy &&
                      (projectIndex === 0 || !projectItems[projectIndex - 1]?.isStudy);
                    return (
                    <React.Fragment key={item.slug}>
                      {isFirstStudy && (
                        <div className="my-1.5 mx-2 border-t border-slate-100" />
                      )}
                    <DropdownMenuItem
                      onClick={() => {
                        router.push(item.slug);
                      }}
                      className={cn(
                        "gap-2 px-3 py-2 cursor-pointer",
                        activeItem?.slug === item.slug && "bg-slate-100",
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 font-medium truncate">
                            <span className="truncate">{item.name}</span>
                            {item.isStudy && (
                              <span className="shrink-0 text-[9px] font-semibold uppercase tracking-wide bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded">
                                Étude
                              </span>
                            )}
                          </span>
                          {item.subtitle && (
                            <span className="text-xs text-muted-foreground truncate">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Indicateurs d'activité avec icônes - badges ronds cliquables */}
                      {item.counts && item.projectId && (
                        <div className="flex items-center gap-1">
                          {item.counts.cadrageCount > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/studio/projects/${item.projectId}/cadrage`,
                                );
                              }}
                              className="text-[10px] font-medium bg-orange-100 text-orange-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center gap-0.5 hover:bg-orange-200 transition-colors"
                            >
                              <PiSearchDefaultStroke className="w-3 h-3" />
                              {item.counts.cadrageCount}
                            </button>
                          )}
                          {item.counts.devisCount > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/studio/projects/${item.projectId}/devis`,
                                );
                              }}
                              className="text-[10px] font-medium bg-emerald-100 text-emerald-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center gap-0.5 hover:bg-emerald-200 transition-colors"
                            >
                              <PiFileTextStroke className="w-3 h-3" />
                              {item.counts.devisCount}
                            </button>
                          )}
                          {item.counts.studioCount > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/studio/projects/${item.projectId}/developpement`,
                                );
                              }}
                              className="text-[10px] font-medium bg-sky-100 text-sky-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center gap-0.5 hover:bg-sky-200 transition-colors"
                            >
                              <PiCodeStroke className="w-3 h-3" />
                              {item.counts.studioCount}
                            </button>
                          )}
                          {item.counts.supportCount > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/studio/projects/${item.projectId}/support`,
                                );
                              }}
                              className="text-[10px] font-medium bg-red-100 text-red-600 min-w-5 h-5 px-1 rounded-full flex items-center justify-center gap-0.5 hover:bg-red-200 transition-colors"
                            >
                              <PiChatChattingStroke className="w-3 h-3" />
                              {item.counts.supportCount}
                            </button>
                          )}
                        </div>
                      )}
                    </DropdownMenuItem>
                    </React.Fragment>
                    );
                  })}
                </>
              )}
              {/* Items du bas (Mail, Vigee System) : tout en bas, après les projets. */}
              {bottomItems.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  {bottomItems.map((item) => (
                    <DropdownMenuItem
                      key={item.slug}
                      onClick={() => {
                        router.push(item.slug);
                      }}
                      className={cn(
                        "gap-2 p-2 cursor-pointer",
                        activeItem?.slug === item.slug && "bg-slate-100",
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="flex items-center justify-center w-5 h-5 [&>svg]:w-4 [&>svg]:h-4 text-slate-600">
                          {item.iconFill || item.icon}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium">{item.name}</span>
                          {item.subtitle && (
                            <span className="text-[11px] text-slate-400 -mt-0.5">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                        {item.badge ? (
                          <span className="ml-auto text-[10px] font-medium bg-blue-100 text-blue-600 min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center">
                            {item.badge > 99 ? "99+" : item.badge}
                          </span>
                        ) : null}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
