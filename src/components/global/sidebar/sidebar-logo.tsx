"use client"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useQueryData} from "@/hooks/useQueryData";
import {getUserWorkspaces} from "@/actions/user";
import {WorkspaceProps} from "@/types/index.type";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import SearchWorkspace from "../search-members";
import { useEffect, useState } from "react";

interface SidebarLogoProps {
    activeWorkspaceId : string
}

const SidebarLogo = ({activeWorkspaceId} : SidebarLogoProps) => {
    const {data, isFetched} = useQueryData(["user-workspaces"], getUserWorkspaces);
    const workspaces = data as WorkspaceProps;
    const router = useRouter();
    const [selectedWorkspace, setSelectedWorkspace] = useState(activeWorkspaceId);

    // When workspace selection changes, navigate to that workspace
    useEffect(() => {
        if (selectedWorkspace) {
            router.push(`/dashboard/${selectedWorkspace}`);
        }
    }, [selectedWorkspace, router]);

    // Find the active workspace title
    const activeWorkspace = workspaces?.find(workspace => workspace.workspaceId === activeWorkspaceId);
    const activeWorkspaceTitle = activeWorkspace?.workspaceTitle || "Select a Workspace";

    return <SidebarMenu className="mt-4 ">
        <SidebarMenuItem className="flex flex-col items-center justify-center gap-4">
            <SidebarMenuButton size="lg" className="flex justify-between items-center p-6 transition duration-300">
                <div>
                    <Image src="/vixa-logo.png" alt="logo" width={40} height={40} className="rounded-lg"/>
                </div>
                <div>
                    <span className="text-white">VIXA</span>
                </div>
            </SidebarMenuButton>

            <Select
                value={selectedWorkspace}
                onValueChange={setSelectedWorkspace}
            >
                <SelectTrigger aria-label="Select a Workspace"
                               className="w-[90%] border-none rounded-lg transition duration-300 hover:bg-[#272729] hover:text-white"
                               style={{borderRadius: "0.5rem", color: "white"}}>
                    <SelectValue placeholder="Select a Workspace">
                        {activeWorkspaceTitle}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-none" style={{borderRadius: "0.3rem"}}>
                    {workspaces?.map((workspace) => (
                        <SelectItem
                            value={workspace.workspaceId}
                            key={workspace.workspaceId}
                        >
                            {workspace.workspaceTitle}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Dialog>
                <DialogTrigger asChild className="text-white">
                    <Button className="text-white border-none w-[90%] hover:bg-[#272729] rounded-lg transition duration-300"  style={{borderRadius: "0.5rem"}}>Invite Members</Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-[#18181a]" style={{borderRadius: "0.3rem"}}>
                    <DialogHeader>
                        <DialogTitle className="text-white">Invite Members to Workspace</DialogTitle>
                        <DialogDescription className="text-[#797a7f]">Add members to workspace</DialogDescription>
                    </DialogHeader>
                    <SearchWorkspace workspaceId={activeWorkspaceId}/>
                    <DialogFooter>
                        <DialogClose className="text-red-500 border-none" style={{borderRadius: "0.3rem"}}>Cancel</DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SidebarMenuItem>
    </SidebarMenu>
}

export default SidebarLogo