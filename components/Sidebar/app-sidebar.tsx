"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
} from "../ui/sidebar";
import { cn } from "../lib/utils";
import FooterSidebar from "./footer-sidebar";
import { SwitcherSidebar } from "./switcher-sidebar";

type LinkItem =
  | { name: string; icon: React.ReactNode; href: string; onClick?: never }
  | {
      name: string;
      icon: React.ReactNode;
      href?: never;
      onClick: () => Promise<void> | void;
    };

type Links = LinkItem;

type MenuItem = {
  name: string;
  slug: string;
  type?: string;
  icon: React.ReactNode;
  iconFill: React.ReactNode;
  href: string;
  notifications?: number;
  actions?: { title: string; url: string }[];
  dropdownContent?: React.ReactNode;
};

const AppSidebar = ({
  items,
  bottomItems,
  itemsSwitcher,
  logo,
  logoSmall,
  pathname,
  user,
  links,
  headerComponent,
  switcher,
  classNameItems,
  hoverBackground = "bg-slate-800",
  onNavigate,
}: {
  items: MenuItem[];
  bottomItems?: MenuItem[];
  itemsSwitcher?: {
    name: string;
    slug: string;
    type: string;
    icon: React.ReactNode;
  }[];
  logo?: string;
  logoSmall?: string;
  pathname: string;
  user?: { name: string; email: string; avatar: string };
  links: Links[];
  headerComponent?: React.ReactNode;
  switcher?: boolean;
  classNameItems?: string;
  hoverBackground?: string;
  onNavigate?: (href: string) => void;
}) => {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleClick = (item: { href: string }) => {
    if (onNavigate) {
      onNavigate(item.href);
    } else {
      startTransition(() => {
        router.push(item.href);
        router.refresh();
      });
    }
  };
  const { open } = useSidebar();

  // Fonction pour vérifier si un item est actif (match exact ou sous-route)
  const isItemActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + "/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {switcher && itemsSwitcher ? (
          <SwitcherSidebar
            items={itemsSwitcher}
            logo={logo}
            logoSmall={logoSmall}
          />
        ) : logo && open ? (
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="py-4"
          />
        ) : logoSmall && !open ? (
          <Image
            src={logoSmall}
            alt="logoSmall"
            width={80}
            height={80}
            className="py-4 p-1"
          />
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
                  className={cn(
                    "w-full items-center  rounded-md hover:cursor-pointer transition-all duration-300",
                    (isItemActive(item.href) || hoveredItem === item.slug) &&
                      hoverBackground
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    onMouseEnter={() => setHoveredItem(item.slug)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={cn("w-full hover:bg-transparent bg-transparent")}
                  >
                    <div
                      className={`flex items-center gap-2 w-full`}
                      onClick={() => handleClick(item)}
                    >
                      <span
                        className={`${
                          isItemActive(item.href) || hoveredItem === item.slug
                            ? "inline  transition-opacity duration-300"
                            : "hidden  transition-opacity duration-300"
                        }`}
                      >
                        {item.iconFill}
                      </span>
                      <span
                        className={cn(
                          "inline  transition-opacity duration-300",
                          !isItemActive(item.href) && hoveredItem !== item.slug
                            ? "inline  transition-all duration-300"
                            : "hidden  transition-all duration-300",
                          classNameItems
                        )}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={cn(
                          "font-medium text-base group",
                          isItemActive(item.href) || hoveredItem === item.slug
                            ? "text-white  transition-opacity duration-300"
                            : "text-slate-400  transition-opacity duration-300",
                          classNameItems
                        )}
                      >
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
                      <SidebarMenuBadge className="bg-red-400 text-white rounded-full items-center">
                        {item?.notifications}
                      </SidebarMenuBadge>
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
                      <DropdownMenuContent
                        side="right"
                        align="start"
                        className="h-60 overflow-y-auto"
                      >
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
      <SidebarFooter className={classNameItems}>
        {bottomItems && bottomItems.length > 0 && (
          <SidebarMenu>
            {bottomItems.map((item, index) => (
              <SidebarMenuItem
                key={`bottom-${index}`}
                className={cn(
                  "w-full items-center rounded-md hover:cursor-pointer transition-all duration-300",
                  (isItemActive(item.href) || hoveredItem === item.slug) &&
                    hoverBackground
                )}
              >
                <SidebarMenuButton
                  asChild
                  onMouseEnter={() => setHoveredItem(item.slug)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn("w-full hover:bg-transparent bg-transparent")}
                >
                  <div
                    className="flex items-center gap-2 w-full"
                    onClick={() => handleClick(item)}
                  >
                    <span
                      className={`${
                        isItemActive(item.href) || hoveredItem === item.slug
                          ? "inline transition-opacity duration-300"
                          : "hidden transition-opacity duration-300"
                      }`}
                    >
                      {item.iconFill}
                    </span>
                    <span
                      className={cn(
                        "inline transition-opacity duration-300",
                        !isItemActive(item.href) && hoveredItem !== item.slug
                          ? "inline transition-all duration-300"
                          : "hidden transition-all duration-300",
                        classNameItems
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "font-medium text-base group",
                        isItemActive(item.href) || hoveredItem === item.slug
                          ? "text-white transition-opacity duration-300"
                          : "text-slate-400 transition-opacity duration-300",
                        classNameItems
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
        {user && <FooterSidebar user={user} links={links} />}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
