"use client"
import {useCreateWorkspace} from "@/hooks/useCreateWorkspace";
import FormGenerator from "@/components/global/form-generator";
import {Button} from "@/components/ui/button";

const WorkspaceForm = () => {
    const {isPending, errors, onFormSubmit, register} = useCreateWorkspace();

    return <form onSubmit={onFormSubmit}>
        <FormGenerator label="Workspace Name" inputType="input" placeholder="Workspace Name" register={register} name="name" errors={errors} />
        <Button type="submit" disabled={isPending} className="mt-2 bg-white text-black w-full hover:bg-gray-200" style={{borderRadius: "0.4rem"}}>
            Create
        </Button>
    </form>
}

export default WorkspaceForm