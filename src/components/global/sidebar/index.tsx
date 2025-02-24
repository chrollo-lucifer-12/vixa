import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/sidebar/app-sidebar";
import {Separator} from "@/components/ui/separator";

interface SidebarProps {
    activeWorkspaceId : string
}

const Sidebar = ({activeWorkspaceId} : SidebarProps) => {
    return <SidebarProvider>
        <AppSidebar activeWorkspaceId={activeWorkspaceId}  />
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 text-white hover:text-white"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-[#18181a]"/>
                    <div className="aspect-video rounded-xl bg-[#18181a]"/>
                    <div className="aspect-video rounded-xl bg-[#18181a]"/>
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-[#18181a] md:min-h-min"/>
            </div>
        </SidebarInset>
    </SidebarProvider>
}

export default Sidebar