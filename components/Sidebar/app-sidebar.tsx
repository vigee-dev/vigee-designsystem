"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar";
import { Plus, MoreHorizontal } from "lucide-react";
import FooterSidebar from "./footer-sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { SwitcherSidebar } from "./switcher-sidebar";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";

type LinkItem = { name: string; icon: React.ReactNode; href: string; onClick?: never } | { name: string; icon: React.ReactNode; href?: never; onClick: () => Promise<void> | void };

type Links = LinkItem;

const AppSidebar = ({
  items,
  itemsSwitcher,
  logo,
  logoSmall,
  pathname,
  user,
  links,
  headerComponent,
  switcher,
  classNameItems,
  hoverBackground = "bg-zinc-800",
}: {
  items: {
    name: string;
    slug: string;
    type?: string;
    icon: React.ReactNode;
    iconFill: React.ReactNode;
    href: string;
    notifications?: number;
    actions?: { title: string; url: string }[];
    dropdownContent?: React.ReactNode;
  }[];
  itemsSwitcher?: { name: string; slug: string; type: string; icon: React.ReactNode }[];
  logo?: string;
  logoSmall?: string;
  pathname: string;
  user?: { name: string; email: string; avatar: string };
  links: Links[];
  headerComponent?: React.ReactNode;
  switcher?: boolean;
  classNameItems?: string;
  hoverBackground?: string;
}) => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleClick = (item: { href: string }) => {
    router.push(item.href);
    router.refresh();
  };
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {switcher && itemsSwitcher ? (
          <SwitcherSidebar items={itemsSwitcher} logo={logo} logoSmall={logoSmall} />
        ) : logo && open ? (
          <Image src={logo} alt="logo" width={150} height={150} className="py-4" />
        ) : logoSmall && !open ? (
          <Image src={logoSmall} alt="logoSmall" width={80} height={80} className="py-4 p-1" />
        ) : null}
        {headerComponent}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem
                  key={index}
                  className={cn("w-full items-center  rounded-md hover:cursor-pointer transition-all duration-300", (pathname === item.href || hoveredItem === item.slug) && hoverBackground)}>
                  <SidebarMenuButton
                    asChild
                    onMouseEnter={() => setHoveredItem(item.slug)}
                    onMouseLeave={() => setHoveredItem(null)}
                    variant="ghost"
                    className={cn("w-full hover:bg-transparent bg-transparent")}>
                    <div className={`flex items-center gap-2 w-full`} onClick={() => handleClick(item)}>
                      <span className={`${pathname === item.href || hoveredItem === item.slug ? "inline  transition-opacity duration-300" : "hidden  transition-opacity duration-300"}`}>
                        {item.iconFill}
                      </span>
                      <span
                        className={cn(
                          "inline  transition-opacity duration-300",
                          pathname !== item.href && hoveredItem !== item.slug ? "inline  transition-all duration-300" : "hidden  transition-all duration-300",
                          classNameItems
                        )}>
                        {item.icon}
                      </span>
                      <span
                        className={cn(
                          "font-medium text-base group",
                          pathname === item.href || hoveredItem === item.slug ? "text-white  transition-opacity duration-300" : "text-zinc-400  transition-opacity duration-300",
                          classNameItems
                        )}>
                        {item.name}
                      </span>
                    </div>
                  </SidebarMenuButton>

                  {item?.type === "action" && (
                    <SidebarMenuAction asChild className="items-center">
                      <Link href={item?.href}>
                        <Plus />
                        <span className="sr-only">Créer</span>
                      </Link>
                    </SidebarMenuAction>
                  )}

                  {item?.type === "notification" &&
                    item?.notifications &&
                    item?.notifications > 0 &&
                    (open ? (
                      <SidebarMenuBadge className="bg-red-400 text-white rounded-full items-center">{item?.notifications}</SidebarMenuBadge>
                    ) : (
                      <div className="bg-red-400 text-white rounded-full items-center w-2 h-2 absolute top-0 right-0" />
                    ))}

                  {item?.type === "dropdownmenu" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start" className="h-60 overflow-y-auto">
                        {item?.dropdownContent}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user && (
        <SidebarFooter className={classNameItems}>
          <FooterSidebar user={user} links={links} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
