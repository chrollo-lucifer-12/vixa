"use client"
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import Image from "next/image";
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator";
import {useQueryData} from "@/hooks/useQueryData";
import {getUserWorkspaces} from "@/actions/user";
import {WorkspaceProps} from "@/types/index.type";

const SidebarLogo = () => {

    const {data, isFetched} = useQueryData(["user-workspaces"], getUserWorkspaces);
    const workspaces = data as WorkspaceProps

    return <SidebarMenu className="mt-4 ">
        <SidebarMenuItem className="flex flex-col items-center gap-4">
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
                            <SelectItem value={workspace.workspaceId} key={workspace.workspaceId} >{workspace.workspaceTitle}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </SidebarMenuItem>
    </SidebarMenu>
}

export default SidebarLogo