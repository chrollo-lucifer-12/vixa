"use client"
import {useQueryData} from "@/hooks/useQueryData";
import {getFolderInfo} from "@/actions/user";
import {FolderProps} from "@/types/index.type";

interface FolderInfoProps {
    folderId : string
}

const FolderInfo = ({folderId}  : FolderInfoProps) => {
    const {data} = useQueryData(["folder-info"], () => getFolderInfo(folderId))

    const folderInfo = data as FolderProps

    return <div>
        <span className="text-5xl">{folderInfo.name}</span>
        <p className="font-extralight mt-1">{folderInfo.createdAt}</p>
    </div>
}

export default FolderInfo