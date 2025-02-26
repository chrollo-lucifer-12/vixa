"use client"


import {useMutationData} from "@/hooks/useMutationData";
import {createFolder} from "@/actions/workspace";

export const useCreateFolder = (workspaceId : string)=> {
    const {mutate} = useMutationData(["create-folder"], () => createFolder(workspaceId), "workspace-folders");

    const onCreateNewFolder = () => {
        mutate({name : "Untitled", id: "optimistic--id"});
    }

    return {onCreateNewFolder}
}