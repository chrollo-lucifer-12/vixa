import {useMutationData} from "@/hooks/useMutationData";
import {CreateWorkspace} from "@/actions/workspace";

export const useCreateWorkspace = () => {
    const {} = useMutationData(["create-workspace"], (data : {name : string}) => CreateWorkspace(data.name), "user-workspaces")



}