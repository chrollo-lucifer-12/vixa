import {SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/sidebar/app-sidebar";

interface SidebarProps {
    activeWorkspaceId : string
}

const Sidebar = ({activeWorkspaceId} : SidebarProps) => {
    return <SidebarProvider>
        <AppSidebar/>
    </SidebarProvider>
}

export default Sidebar