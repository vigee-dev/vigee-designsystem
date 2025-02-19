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
import { userSidebar } from "./datas-sidebar/footer-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { SwitcherSidebar } from "./switcher-sidebar";

const AppSidebar = ({
  items,
  itemsSwitcher,
  logo,
  pathname,
}: {
  items: { name: string; slug: string; type?: string; icon: React.ReactNode; iconFill: React.ReactNode; href: string; notifications?: number; actions?: { title: string; url: string }[] }[];
  itemsSwitcher: { name: string; slug: string; type: string; icon: React.ReactNode }[];
  logo?: string;
  pathname: string;
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
                    <a href={item.slug} className={`group-${index} flex items-center gap-2  `}>
                      <span className={`${pathname === item.href ? "inline" : "hidden "}`}>{item.iconFill}</span>
                      <span className={`${pathname === item.href ? "hidden" : "inline"}`}>{item.icon}</span>
                      <span className="font-medium text-base">{item.name}</span>
                    </a>
                  </SidebarMenuButton>

                  {item?.type === "action" && (
                    <SidebarMenuAction asChild>
                      <a href={item?.href}>
                        <Plus />
                        <span className="sr-only">Créer</span>
                      </a>
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
                        {item?.actions?.map((action, index) => (
                          <DropdownMenuItem key={index} className={"flex items-center gap-x-2"}>
                            <a href={action.url}>
                              <span>{action.title}</span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar user={userSidebar} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
