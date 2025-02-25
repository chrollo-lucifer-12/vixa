import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import AppSidebar from "@/components/global/sidebar/app-sidebar";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {UserButton} from "@clerk/nextjs";

interface SidebarProps {
    activeWorkspaceId : string
    children: React.ReactNode
}

const Sidebar = ({activeWorkspaceId, children} : SidebarProps) => {
    return <SidebarProvider>
        <AppSidebar activeWorkspaceId={activeWorkspaceId}/>
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 text-white hover:text-white"/>
                    <Separator orientation="vertical" className="mr-2 h-4 text-white"/>
                </div>
                <div className="mr-4">

                <UserButton/>
                </div>
            </header>
            <div className="min-h-[100vh] flex-1 m-4 rounded-xl bg-[#18181a] md:min-h-min">
                {children}
            </div>
        </SidebarInset>
    </SidebarProvider>
}

export default Sidebar