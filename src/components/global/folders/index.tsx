"use client"
import {FolderOpen, FoldersIcon} from "lucide-react";
import Folder from "@/components/global/folder";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {useQueryData} from "@/hooks/useQueryData";
import {getWorkspaceFolders} from "@/actions/workspace";
import {useMutationDataState} from "@/hooks/useMutationData";
import {Skeleton} from "@/components/ui/skeleton";

interface FoldersProps {
    workspaceId : string
}

type FolderProps =
    {
        folder: {
            id: string,
            name: string | null,
            createdAt: string | null,
            workspaceId: string | null,
        },
        videoCount: number
    }[]

const Folders = ({workspaceId} : FoldersProps) => {

    const {data, isFetched} = useQueryData(["workspace-folders"], () => getWorkspaceFolders(workspaceId));
    const {latestVariables} = useMutationDataState(["create-folder"])
    const folders = data as FolderProps

    if (isFetched && folders) {

    }

    return (
        <div className="mt-6 flex flex-col gap-y-5">
            <div className="flex items-center gap-x-3 group">
                <FolderOpen/>
                <span>Folders</span>
            </div>
            <ScrollArea className="w-[800px] whitespace-nowrap">
                <div className="flex ">
                    {
                        folders.length ?
                        folders.map((folderData) => (
                            <Folder key={folderData.folder.id} title={folderData.folder.name!} count={folderData.videoCount} id={folderData.folder.id}/>
                        )) : (
                            <p className="text-center text-[#95969d]">No folders in this workspace</p>
                            )
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default Folders