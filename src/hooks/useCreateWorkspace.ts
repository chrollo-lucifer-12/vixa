"use client"
import {useMutationData} from "@/hooks/useMutationData";
import {CreateWorkspace} from "@/actions/workspace";
import useZodForm from "@/hooks/useZodForm";
import {workspaceSchema} from "@/components/global/workspace-form/schema";

export const useCreateWorkspace = () => {
    const {mutate, isPending} = useMutationData(["create-workspace"], (data : {name : string}) => CreateWorkspace(data.name), "user-workspaces")

    const {errors, onFormSubmit, register} = useZodForm(workspaceSchema, mutate);
    return {errors, onFormSubmit, register, isPending};
}