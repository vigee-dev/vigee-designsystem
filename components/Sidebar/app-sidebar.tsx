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
} from "../../components/ui/sidebar";
import { Plus, MoreHorizontal } from "lucide-react";
import FooterSidebar from "./footer-sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { SwitcherSidebar } from "./switcher-sidebar";
import Link from "next/link";

const AppSidebar = ({
  items,
  itemsSwitcher,
  logo,
  pathname,
  user,
  links,
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
  itemsSwitcher: { name: string; slug: string; type: string; icon: React.ReactNode }[];
  logo?: string;
  pathname: string;
  user?: { name: string; email: string; avatar: string };
  links: { name: string; icon: React.ReactNode; href: string }[];
}) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SwitcherSidebar items={itemsSwitcher} logo={logo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} className={`py-4`}>
                    <Link href={item.slug} className={`group-${index} flex items-center gap-2  `}>
                      <span className={`${pathname === item.href ? "inline" : "hidden "}`}>{item.iconFill}</span>
                      <span className={`${pathname === item.href ? "hidden" : "inline"}`}>{item.icon}</span>
                      <span className="font-medium text-base">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item?.type === "action" && (
                    <SidebarMenuAction asChild>
                      <Link href={item?.href}>
                        <Plus />
                        <span className="sr-only">Créer</span>
                      </Link>
                    </SidebarMenuAction>
                  )}
                  {item?.type === "notification" && item?.notifications && item?.notifications > 0 && (
                    <SidebarMenuBadge className="bg-red-400 text-white rounded-full">{item?.notifications}</SidebarMenuBadge>
                  )}

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
        <SidebarFooter>
          <FooterSidebar user={user} links={links} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
