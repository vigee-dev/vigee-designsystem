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
} from "../../icons/PikaIcons";

type SwitcherItem = {
  name: string;
  slug: string;
  icon: React.ReactNode;
  type?: string;
  subtitle?: string;
  projectId?: number;
  counts?: {
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
  const { isMobile, open } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Utiliser usePathname pour détecter les changements de route côté client
  const clientPath = usePathname();
  // Utiliser le path client s'il est disponible, sinon le path serveur
  const activePath = clientPath || currentPath;

  // Trouver l'item actif basé sur le path courant
  const activeItem = items.find((item) => {
    // Apps indépendantes — détecter par préfixe de route
    if (activePath?.startsWith("/leads") && item.slug.startsWith("/leads")) return true;
    if (activePath?.startsWith("/rh") && item.slug.startsWith("/rh")) return true;
    if (activePath?.startsWith("/finances") && item.slug.startsWith("/finances")) return true;

    if (activePath?.includes("/studio/projects/")) {
      // Si on est sur un projet, chercher le projet correspondant
      const projectMatch = activePath.match(/\/studio\/projects\/(\d+)/);
      if (projectMatch) {
        const projectPattern = new RegExp(`/studio/projects/${projectMatch[1]}(/|$)`);
        return projectPattern.test(item.slug);
      }
    }
    // Sur une page ticket avec projectId en query param, garder le contexte projet
    const projectIdParam = searchParams?.get("projectId");
    if (activePath?.startsWith("/studio/tickets/") && projectIdParam) {
      const projectPattern = new RegExp(`/studio/projects/${projectIdParam}(/|$)`);
      return projectPattern.test(item.slug);
    }
    // Studio = tout /studio sauf les pages projets
    if (item.type === "studio" && activePath?.startsWith("/studio") && !activePath?.includes("/studio/projects/")) {
      return true;
    }
    return false;
  });

  // Séparer Studio, Apps et Projets
  const studioItem = items.find((item) => item.type === "studio");
  const appItems = items.filter((item) => item.type === "app");
  const projectItems = items.filter((item) => item.type === "project");

  // Logo component - aligné à gauche
  const LogoComponent = () => (
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
        <LogoComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Logo en haut */}
      <LogoComponent />

      {/* Switcher en dessous */}
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-slate-800 hover:bg-slate-800 bg-slate-800/50 rounded-lg border border-slate-700"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {activeItem?.icon}
                  {open && (
                    <div className="flex flex-col min-w-0 flex-1 text-left">
                      <span className="font-semibold text-sm text-white truncate">
                        {activeItem?.name || "Sélectionner"}
                      </span>
                      {activeItem?.subtitle && (
                        <span className="text-xs text-slate-400 truncate">
                          {activeItem.subtitle}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {open && <ChevronsUpDown className="w-4 h-4 text-slate-400" />}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg max-h-96 overflow-y-auto"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              {/* Section Studio (ex-Admin) */}
              {studioItem && (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(studioItem.slug);
                    }}
                    className={cn(
                      "gap-2 p-3 cursor-pointer",
                      activeItem?.slug === studioItem.slug && "bg-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {studioItem.icon}
                      <span className="font-medium">{studioItem.name}</span>
                    </div>
                  </DropdownMenuItem>
                  {(appItems.length > 0 || projectItems.length > 0) && <DropdownMenuSeparator />}
                </>
              )}

              {/* Section Apps (Leads, RH, Finances) */}
              {appItems.length > 0 && (
                <>
                  <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                    Apps
                  </DropdownMenuLabel>
                  {appItems.map((item) => (
                    <DropdownMenuItem
                      key={item.slug}
                      onClick={() => {
                        router.push(item.slug);
                      }}
                      className={cn(
                        "gap-2 p-2 cursor-pointer",
                        activeItem?.slug === item.slug && "bg-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {projectItems.length > 0 && <DropdownMenuSeparator />}
                </>
              )}

              {/* Section Projets */}
              {projectItems.length > 0 && (
                <>
                  <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                    Projets
                  </DropdownMenuLabel>
                  {projectItems.map((item) => (
                    <DropdownMenuItem
                      key={item.slug}
                      onClick={() => {
                        router.push(item.slug);
                      }}
                      className={cn(
                        "gap-2 p-2 cursor-pointer",
                        activeItem?.slug === item.slug && "bg-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {item.icon}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="font-medium truncate">{item.name}</span>
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
                          {item.counts.devisCount > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/studio/projects/${item.projectId}/devis`);
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
                                router.push(`/studio/projects/${item.projectId}/developpement`);
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
                                router.push(`/studio/projects/${item.projectId}/support`);
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
