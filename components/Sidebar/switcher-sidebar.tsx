"use client";

import * as React from "react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../../components/ui/sidebar";
import HeaderButtonSidebar from "./header-button-sidebar";
import { headerData } from "./datas-sidebar/header-data";
import { usePathname, useRouter } from "next/navigation";

export function SwitcherSidebar({
  items,
  menuTitle,
  logo,
  logoSmall,
}: {
  items: {
    name: string;
    slug: string;
    icon: React.ReactNode;
  }[];
  menuTitle?: string;
  logo?: string;
  logoSmall?: string;
}) {
  const { isMobile } = useSidebar();

  const pathname = usePathname();
  const router = useRouter();

  const activeTeamFind = items.find(item => item.slug === pathname);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" asChild={headerData.type === "link"} className={"data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"}>
              <HeaderButtonSidebar headerData={headerData} logo={logo} logoSmall={logoSmall} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            {menuTitle && <DropdownMenuLabel className="text-xs text-muted-foreground">{menuTitle}</DropdownMenuLabel>}
            {items.map((item, index) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => {
                  router.push(item.slug);
                  router.refresh();
                }}
                className="gap-2 p-2">
                {item.icon}
                {item.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
