import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import WorkspaceForm from "@/components/global/workspace-form";

const CreateWorkspace = () => {
    return <div className="mt-10">
        <Dialog>
            <DialogTrigger className="bg-[#272729] hover:bg-[#272799] text-white pl-6 pr-6 pt-1 pb-1 text-lg font-semibold tracking-tight transition-colors first:mt-0" style={{borderRadius: "0.4rem"}}> Create Workspace</DialogTrigger>
            <DialogContent className="bg-[#09090b]">
                <DialogHeader className="text-white">
                    <DialogTitle>Create A Workspace</DialogTitle>
                    <DialogDescription className="text-[#9d9da4]">
                        Workspaces help you collaborate with team members. You're assigned a default personal workspace where you can share videos in private with yourself.
                    </DialogDescription>
                    <WorkspaceForm  />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
}

export default CreateWorkspace