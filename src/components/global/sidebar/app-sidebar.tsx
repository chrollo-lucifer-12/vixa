import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from "@/components/ui/sidebar";
import SidebarLogo from "@/components/global/sidebar/sidebar-logo";
import NavMain from "@/components/global/sidebar/nav-main";

interface AppSidebarProps {
    activeWorkspaceId : string
}

const AppSidebar = ({activeWorkspaceId} : AppSidebarProps) => {
    return <Sidebar collapsible="icon">
        <SidebarHeader className="bg-[#18181a]">
            <SidebarLogo activeWorkspaceId={activeWorkspaceId} />
        </SidebarHeader>
        <SidebarContent className="bg-[#18181a]">
            <NavMain activeWorkspaceId={activeWorkspaceId} />
        </SidebarContent>
        <SidebarFooter className="bg-[#18181a]">

        </SidebarFooter>
    </Sidebar>
}

export default AppSidebar