"use client"
import {useCreateFolder} from "@/hooks/useCreateFolder";
import {Button} from "@/components/ui/button";

interface CreateFolderProps {
    workspaceId : string
}

const CreateFolder = ({workspaceId} : CreateFolderProps) => {

    const {onCreateNewFolder} = useCreateFolder(workspaceId);

    return <div className="mt-10">
        <Button onClick={onCreateNewFolder} className="">Create Folder</Button>
    </div>
}

export default CreateFolder