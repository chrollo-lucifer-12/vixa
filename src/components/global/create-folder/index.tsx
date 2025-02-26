"use client"
import {useCreateFolder} from "@/hooks/useCreateFolder";
import {Button} from "@/components/ui/button";

interface CreateFolderProps {
    workspaceId : string
}

const CreateFolder = ({workspaceId} : CreateFolderProps) => {

    const {onCreateNewFolder} = useCreateFolder(workspaceId);

    return <div className="mt-10">
        <Button className="bg-[#272729] hover:bg-[#272799] text-white pl-6 pr-6 pt-1 pb-1 text-lg font-semibold tracking-tight transition-colors first:mt-0" style={{borderRadius: "0.6rem"}} onClick={onCreateNewFolder}>Create Folder</Button>
    </div>
}

export default CreateFolder