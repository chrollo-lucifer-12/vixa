import SectionHeader from "@/components/global/section-header";
import CreateWorkspace from "@/components/global/create-workspace";
import CreateFolder from "@/components/global/create-folder";
import Folders from "@/components/global/folders";

const Page = async ({params} : {params : {workspaceId : string}}) => {

    const {workspaceId} = await params

    return <div className="text-white mt-8 ml-5">
        <SectionHeader title="My Library" subtitle="See all your videos here"  />
        <div className="flex gap-x-3">

        <CreateWorkspace />
        <CreateFolder workspaceId={workspaceId}/>
        </div>
        <Folders workspaceId={workspaceId} />
    </div>
}

export default Page