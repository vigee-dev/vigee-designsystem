import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../components/ui/sidebar";
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
