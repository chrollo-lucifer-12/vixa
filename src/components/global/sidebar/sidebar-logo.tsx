"use client"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
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
import {CircleX, Cross, PlusIcon} from "lucide-react";
import SearchWorkspace from "../search-members";

interface SidebarLogoProps {
    activeWorkspaceId : string
}

const SidebarLogo = ({activeWorkspaceId} : SidebarLogoProps) => {

    const {data, isFetched} = useQueryData(["user-workspaces"], getUserWorkspaces);
    const workspaces = data as WorkspaceProps

    const router = useRouter();

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

                <Select>
                    <SelectTrigger aria-label="Select a Workspace"
                                   className="w-[90%] border-none rounded-lg transition duration-300 hover:bg-[#272729] hover:text-white"
                                   style={{borderRadius: "0.5rem", color: "white"}}>
                        <span>Select a Workspace</span>
                    </SelectTrigger>
                    <SelectContent className="bg-black text-white border-none " style={{borderRadius: "0.3rem"}}>
                        {
                            workspaces.map((workspace) => (
                                <SelectItem value={workspace.workspaceId} key={workspace.workspaceId}
                                            onClick={() => router.push(`/dashboard/${workspace.workspaceId}`)}>{workspace.workspaceTitle}</SelectItem>
                            ))
                        }
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