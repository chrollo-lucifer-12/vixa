import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from "@/components/ui/sidebar";
import SidebarLogo from "@/components/global/sidebar/sidebar-logo";

const AppSidebar = () => {
    return <Sidebar collapsible="icon">
        <SidebarHeader className="bg-[#18181a]">
            <SidebarLogo/>
        </SidebarHeader>
        <SidebarContent className="bg-[#18181a]">

        </SidebarContent>
        <SidebarFooter className="bg-[#18181a]">

        </SidebarFooter>
    </Sidebar>
}

export default AppSidebar