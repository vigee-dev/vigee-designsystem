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
} from "../components/ui/sidebar";
import { Plus, MoreHorizontal } from "lucide-react";
import FooterSidebar from "./footer-sidebar";
import { userSidebar } from "./datas-sidebar/footer-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { SwitcherSidebar } from "./switcher-sidebar";

const AppSidebar = ({
  items,
  itemsSwitcher,
  logo,
}: {
  items: { name: string; slug: string; type?: string; icon: React.ReactNode; href: string; notifications?: number; actions?: { title: string; url: string }[] }[];
  itemsSwitcher: { name: string; slug: string; type: string; icon: React.ReactNode }[];
  logo?: string;
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
              {items.map(item => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.slug}>
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  {item?.type === "action" && (
                    <SidebarMenuAction asChild>
                      <a href={item?.href}>
                        <Plus /> <span className="sr-only">Créer</span>
                      </a>
                    </SidebarMenuAction>
                  )}
                  {item?.type === "notification" && <SidebarMenuBadge>{item?.notifications}</SidebarMenuBadge>}
                  {item?.type === "dropdownmenu" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
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
